package com.samir.cloudbalance.services;

import com.samir.cloudbalance.dto.CostExplorerFilterResponseDto;
import com.samir.cloudbalance.dto.request.CostExplorerRequestDto;
import com.samir.cloudbalance.dto.response.CostExplorerResponseDto;
import com.snowflake.snowpark.*;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.snowflake.snowpark.functions.*;

@Service
public class CostExplorerService {

    private final Session session;

    public CostExplorerService(Session session) {
        this.session = session;
    }

    public void getalldata(){
        DataFrame df = session.sql("select * from CLOUDBALANCE.PUBLIC.CLOUD_COST_TABLE");
        Row[] rows = df.collect();
        for(Row row:rows){
            System.out.println(row
            );
        }
    }

    public List<CostExplorerResponseDto> fetchCostData(CostExplorerRequestDto req) {

        System.out.println("fetchCostData req : " + req);

    DataFrame df = session.sql("select * from CLOUDBALANCE.PUBLIC.CLOUD_COST_TABLE");

        df = df.filter(
                col("BILL_DATE").between(
                        lit(req.getStartDate()),
                        lit(req.getEndDate())
                )
        );

        df = applyFilter(df, "SERVICE", req.getService());
        df = applyFilter(df, "ACCOUNT_ID", req.getAccountId());
        df = applyFilter(df, "INSTANCE_TYPE", req.getInstanceType());
        df = applyFilter(df, "USAGE_TYPE", req.getUsageType());
        df = applyFilter(df, "PLATFORM", req.getPlatform());
        df = applyFilter(df, "REGION", req.getRegion());
        df = applyFilter(df, "USAGE_TYPE_GROUP", req.getUsageTypeGroup());
        df = applyFilter(df, "PURCHASE_OPTION", req.getPurchaseOption());
        df = applyFilter(df, "API_OPERATION", req.getApiOperation());
        df = applyFilter(df, "RESOURCE", req.getResource());
        df = applyFilter(df, "AVAILABILITY_ZONE", req.getAvailabilityZone());
        df = applyFilter(df, "TENANCY", req.getTenancy());
        df = applyFilter(df, "LEGAL_ENTITY", req.getLegalEntity());
        df = applyFilter(df, "BILLING_ENTITY", req.getBillingEntity());

        DataFrame result = df
                .withColumn("USAGE_MONTH", month(col("BILL_DATE")))
                .groupBy(new Column[]{
                        col(req.getGroupBy()),
                        col("USAGE_MONTH")
                })
                .agg(new Column[]{
                        sum(col("COST")).as("TOTAL_COST")
                });

        Row[] rows = result.collect();

        System.out.println("Rows: " + Arrays.toString(rows));

        Map<String, Map<String, Double>> map = new HashMap<>();

        for (Row row : rows) {
            String key = String.valueOf(row.get(0));
//            String key = row.getString(0);
            String month = "M" + row.getInt(1);
//            double cost = row.getDouble(2);

            double cost = row.getDecimal(2).doubleValue();

            map.computeIfAbsent(key, k -> new HashMap<>())
                    .put(month, cost);
        }


        List<CostExplorerResponseDto> response = new ArrayList<>();
        map.forEach((k, v) -> response.add(new CostExplorerResponseDto(k, v)));

        return response;
    }


    private DataFrame applyFilter(DataFrame df, String column, List<String> values) {
        if (values != null && !values.isEmpty()) {
            Column condition = col(column).equal_to(lit(values.get(0)));
            for (int i = 1; i < values.size(); i++) {
                condition = condition.or(col(column).equal_to(lit(values.get(i))));
            }
            return df.filter(condition);
        }
        return df;
    }


    public CostExplorerFilterResponseDto fetchAvailableFilters() {

        DataFrame df = session.sql(
                "SELECT " +
                        "SERVICE, " +
                        "ACCOUNT_ID, " +
                        "REGION, " +
                        "PLATFORM, " +
                        "USAGE_TYPE_GROUP, " +
                        "PURCHASE_OPTION, " +
                        "BILLING_ENTITY " +
                        "FROM CLOUDBALANCE.PUBLIC.CLOUD_COST_TABLE"
        );

        Map<String, List<String>> filters = new HashMap<>();

        filters.put("service", extractDistinct(df, "SERVICE"));
        filters.put("account", extractDistinct(df, "ACCOUNT_ID"));
        filters.put("region", extractDistinct(df, "REGION"));
        filters.put("platform", extractDistinct(df, "PLATFORM"));
        filters.put("usageGroup", extractDistinct(df, "USAGE_TYPE_GROUP"));
        filters.put("purchaseOption", extractDistinct(df, "PURCHASE_OPTION"));
        filters.put("billingEntity", extractDistinct(df, "BILLING_ENTITY"));

        CostExplorerFilterResponseDto response = new CostExplorerFilterResponseDto();
        response.setFilters(filters);
        return response;
    }

    private List<String> extractDistinct(DataFrame df, String columnName) {
        Row[] rows = df
                .select(new Column[]{col(columnName)})
                .distinct()
                .collect();

        List<String> result = new ArrayList<>();
        for (Row row : rows) {
            Object value = row.get(0);
            if (value != null) {
                result.add(value.toString());
            }
        }
        return result;
    }
}
