<template lang="pug">

//- pre {{dataList}}
div(id="map" style="width:100%;height:700px;margin:0 auto; overflow:hidden; border:1px solid;")
//- section(style="position:fixed; bottom: 10px; width:100%; height:30px; z-index:999; background: white;")
//-   .row
//-     //- q-btn(@click="search()") {{refAddr}} 검색
//-     q-btn(@click="openDialog()") 만들기
//-     q-btn(@click="updateData()") 수정
//-     q-btn(@click="deleteData()") 삭제
//- //- deleteData
//- div {{ dialog }}

//- q-dialog( v-model="dialog" persistent  style="display:block")
//-   q-card( class="bg-teal text-white" style="width: 300px")
//-     q-card-section
//-       div( class="text-h6") 새로만들기
//-     q-card-section( class="q-pt-none")
//-       q-input(v-model="newData.name" label="약국이름")
//-       q-input(v-model="newData.address" label="주소")
//-       q-input(v-model="newData.open" label="영업시간")
//-       q-input(v-model="newData.tel" label="전화번호")

//-     q-card-actions( align="right" class="bg-white text-teal")
//-       q-btn(style="background:white; color:black" @click="createData(newData)" v-close-popup) 만들기

//- q-dialog( v-model="dialog" persistent  style="display:block")
//-   q-card( class="bg-teal text-white" style="width: 300px")
//-     q-card-section
//-       div( class="text-h6") 수정하기
//-     q-card-section( class="q-pt-none")
//-       q-input(v-model="newData.name" label="약국이름")
//-       q-input(v-model="newData.address" label="주소")
//-       q-input(v-model="newData.open" label="영업시간")
//-       q-input(v-model="newData.tel" label="전화번호")

//-     q-card-actions( align="right" class="bg-white text-teal")
//-       q-btn(style="background:white; color:black" @click="createData()" v-close-popup) 수정


//- div {{ targetIdx }} {{ targetData }}
//- //- address, name, open, sido, sigungu, tel
//- q-input(v-model="targetData.name" label="약국이름")
//- q-input(v-model="targetData.address" label="주소")
//- q-input(v-model="targetData.open" label="영업시간")
//- q-input(v-model="targetData.tel" label="전화번호")

//- q-card(v-if="dataList" v-for="(dataItem, idx) in dataList"
//-   dark bordered
//-   class="bg-grey-9 my-card"
//-   @click="selectData(dataItem.key, dataItem)"
//-   v-bind:class="{ selected: dataItem.key === targetIdx }"
//-   )

//-   q-card-section
//-     div( class="text-h6") {{ dataItem.key }}: {{ dataItem.name }} {{ dataItem.key === targetIdx }}
//-     div( class="text-subtitle2") {{ dataItem.address }}

//-     q-separator( dark inset)

//-     q-card-section
//-       div {{ dataItem.open }}
//-       div {{ dataItem.tel }}

</template>

<!-- src="" -->
<script>
import axios  from "axios";
    axios.defaults.withCredentials = true;
  export default {
    name :"KakaoMap",
    data(){
      return{
        markerList : [],
        infowindowList : [],
        positions : []
      }
    },
    mounted(){
      if (window.kakako && window.kakako.maps) {
        this.initMap();
      } else{
        const script = document.createElement("script")
        script.onload = () => kakao.maps.load(this.initMap);
        script.src="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=cfd4e527f6a472cb323f1ffa306cf3a8&libraries=services"
        document.head.appendChild(script)
      }
    },
    methods :{
      initMap(){
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(34.74756145157297, 127.74561623573636), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

	      this.map = new kakao.maps.Map(mapContainer, mapOption);
      },
      hotelService(){
        var getList =axios({
          method: 'post',
          url: 'http://localhost:3000/hotel',
          headers: {'X-Requested-With': 'XMLHttpRequest'} ,
          responseType: 'json'
        })
          .then((Response)=>{
            return Response.data;
          })
          .catch(function (error) {
            // 에러 핸들링
            console.log(error.toJSON());
          })
          return {getList:getList}
      }
    }
  }
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
