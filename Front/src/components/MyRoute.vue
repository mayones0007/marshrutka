<template>
  <div class="myRoute-page">
    <div class="map">
      <yandex-map
        :coords = "coords" 
        zoom = "5"
        :controls = "controls"
        @map-was-initialized="mapInitialized"
      >
      <ymap-marker 
        :coords="coords" 
        marker-id="Старт" 
        hint-content=""
      />
      </yandex-map>
    </div>
    <MyButton title="Постороить маршрут" @click="routeCreate" />
    <RoutePoint
      v-for='routePoint in myRoute'
      :key="routePoint.id"
      :routePoint="routePoint"
    />
  </div>
</template>

<script>
import RoutePoint from './CustomComponents/RoutePoint.vue'
import MyButton from './CustomComponents/MyButton.vue'
import { axiosInstance } from '../httpClient'
let myMap = null;
export default {
components: {
  RoutePoint,
  MyButton,
},
data(){
  return{
    coords: [
      54.82896654088406,
      39.83189382275390
      ],
    controls: ['default'],
    
    }
  },
computed: {
  user() {
    return this.$store.state.user
  },
  myRoute(){
    return this.$store.state.myRoute;
  },
  routeCoords() {
    return this.$store.state.myRoute.map(item => item.coords)
    },
},
  methods: {
  async getMyOptimalRoute(){
  await this.$store.dispatch("getOptimalRoute")
  },
      async routeCreate() {
      try {
        await axiosInstance.get(`optimalroute?id=${this.$store.state.user.id}`)
      } catch (e) {
        console.log("Ошибка HTTP: " + e.response.data.message)
      }
    },

  async routeCreate1(){
      const route = this.routeCoords
      for (let j=0; j<route.length; j++){
        for (let i=j+1; i<route.length; i++){
          await this.newRoute([route[j],route[i]])
        }
      }
  },

  async newRoute(coords){
    const multiRoute = new window.ymaps.multiRouter.MultiRoute({
      referencePoints: coords,
      }, {
      editorDrawOver: false,
      wayPointDraggable: false,
      viaPointDraggable: false,
      // Зададим собственное оформление линий мультимаршрута.
      routeStrokeColor: "000088",
      routeActiveStrokeColor: "ff0000",
      pinIconFillColor: "ff0000",
      boundsAutoApply: true,
      zoomMargin: 30
      });
      multiRoute.model.events.add('requestsuccess', function() {
        const activeRoute = multiRoute.getActiveRoute()
        const place1 = coords[0]
        const place2 = coords[1]
        const distance = activeRoute.properties.get("distance").value
        const duration = activeRoute.properties.get("duration").value
        console.log(place1)
        console.log(place2)
        console.log(distance)
        console.log(duration)
      })
      //myMap.geoObjects.add(multiRoute);
  },

    async findMe(){
      const location = window.ymaps.geolocation.get();
      return location.then(
        function(result) {
          myMap.geoObjects.add(result.geoObjects)
          return result.geoObjects.position
        },
      );
    },

    async addInRouteMap(place1, place2, distance, duration){
      const response = await axiosInstance.post('routemap',{place1, place2, distance, duration})
        const data = await response.json();
        console.log(data.message);
    },

    mapInitialized(e){
      myMap = e;
    },
  },
}
</script>

<style scoped>
.myRoute-page{
  padding: 2%;
}

.map {
  height: 600px;
  width: 100%;
  margin-bottom: 20px;
}

.ymap-container {
  width: 100%;
  height: 100%;
}

.route-point--start{
  text-align: start;
  font-weight: 100;
  font-size: 18px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  background-color:aliceblue;
  display: grid;
  height: 50px;
  grid-template-columns: 300px 1fr 150px;
  gap: 20px;
  border: solid 1px rgba(0, 0, 0, 0.076);
}
</style>