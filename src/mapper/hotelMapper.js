const DataList = [];
var OracleDB = require('oracledb');
var cors= require('cors')

// mybatis-mapper 추가
var mybatisMapper = require('mybatis-mapper');
// Mapper Load
mybatisMapper.createMapper(['./src/mapper/oracle-mapper.xml']);

const axios = require('axios').default;
var express = require('express')
  , http = require('http')
var app = express();
app.use(express.static(__dirname));
app.use(
  cors({
    origin: ['http://localhost:9000'],
    credentials: true,
  }),
);

app.set('port', process.env.PORT || 3000);

// app.get('/',(req,res)=>{
//   res.send('Root')x
// })
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  res.send('Hello World!'); // "Hello World!"를 보냅니다.
});


app.post('/hotel', function (request, response) {
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
        for (const i in result.rows) {
          if (Object.hasOwnProperty.call(result.rows, i)) {
            let rows = result.rows[i]
            const jsonData = {
              HOTELID: rows[0],
              NAME: rows[1],
              ADDRESS: rows[2],
              COMMENTS: rows[3],
              PRICE: rows[4],
              STARRATE: rows[5],
              LATITUDE: rows[6],
              LONGITUDE: rows[7],
              CATRGORY: rows[8]
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
        // axios.post('http://localhost:3000/hotel', {
        //   DataList
        // })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // console.log(DataList)
        response.send(DataList);
        doRelease(response, connection, result.rows);
      })
    })

});

http.createServer(app).listen(app.get('port'), ()=>{
  console.log('Express server port : '+app.get('port'))
})

function doRelease(response, connection, result) {
  connection.release(function (err) {
      if (err) {
          console.error(err.message);
      }

  });
}
