package com.samir.cloudbalance.service;

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

        DataFrame df = session.sql("select * from CLOUDBALANCE.PUBLIC.CLOUD_COST_TABLE");

        df = df.filter(
                col("BILL_DATE").between(
                        lit(req.getStartDate()),
                        lit(req.getEndDate())
                )
        );

        df = applyFilter(df, "SERVICE", req.getService());
        df = applyFilter(df, "ACCOUNT_ID", req.getAccountId());
        df = applyFilter(df, "REGION", req.getRegion());
        df = applyFilter(df, "PLATFORM", req.getPlatform());
        df = applyFilter(df, "USAGE_TYPE_GROUP", req.getUsageTypeGroup());
        df = applyFilter(df, "PURCHASE_OPTION", req.getPurchaseOption());
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

        Map<String, Map<String, Double>> map = new HashMap<>();

        for (Row row : rows) {
            String key = row.getString(0);
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

}
