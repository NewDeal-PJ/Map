<template lang="pug">

//- pre {{dataList}}

section(style="position:fixed; bottom: 10px; width:100%; height:30px; z-index:999; background: white;")
  .row

</template>

<script>
import { OracleDB } from "oracledb"; 
// mybatis-mapper 추가
import { mybatisMapper } from "mybatis-mapper";
import axios from "src/boot/axios";
// Mapper Load
mybatisMapper.createMapper(['./mapper/oracle-mapper.xml']);

OracleDB.getConnection({ user: "jeju", password: "1111", connectString: "np.silly.monster/xe" },

    function (err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        var format = { language: 'sql', indent: ' ' }
        var query = mybatisMapper.getStatement('oracleMapper', 'getListHotel', format);
        console.log(query)
        connection.execute(query, {}, function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            const HOTELID = result.metaData[0].name
            const NAME = result.metaData[1].name
            const ADDRESS = result.metaData[2].name
            const COMMENTS = result.metaData[3].name
            const PRICE = result.metaData[4].name
            const STARRATE = result.metaData[5].name
            const LATITUDE = result.metaData[6].name
            const LONGITUDE = result.metaData[7].name
            const CATRGORY = result.metaData[8].name
            const DataList = [];
            for (const i in result.rows) {
                if (Object.hasOwnProperty.call(result.rows, i)) {
                    let rows = result.rows[i]
                    const jsonData = {
                        HOTELID: rows[0],
                        NAME : rows[1],
                        ADDRESS : rows[2],
                        COMMENTS : rows[3],
                        PRICE : rows[4],
                        STARRATE : rows[5],
                        LATITUDE : rows[6],
                        LONGITUDE : rows[7],
                        CATRGORY : rows[8]
                    }
                    DataList.push(jsonData)
                }
            }
            // console.log(DataList)
            //         const rows = result.rows[i];
            //         if (Object.hasOwnProperty.call(result.metaData, j)) {
            //             const column = result.metaData[j].name;
            //             const obj = Object.assign({}, rows)

            //         }
            axios.post('http://localhost:9000/hotel', {
                DataList
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        })
    })

</script>
<style>
.listContainer {
  padding: 8px;
  background: lightgray;
  margin-bottom: 12px;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
}

.selected {
  background: red !important;
}
</style>
