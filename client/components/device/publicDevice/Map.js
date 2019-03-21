import React, {Component, PropTypes} from 'react'

export default class Time extends Component {
  static propTypes = {
    organAddress: PropTypes.string,

  }
  componentDidMount() {

    const {longitude,latitude} = this.props
    let map = new BMap.Map("j-baidu-map")
    let point = new BMap.Point(longitude,latitude)
    map.centerAndZoom(point,15);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.panTo(point);
    let geolocation = new BMap.Geolocation()
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件
      var address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
    });
    geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);
    // geolocation.getCurrentPosition(function(r){
    //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //     var mk = new BMap.Marker(r.point)
    //     map.addOverlay(mk)
    //     map.panTo(r.point)
    //   }
    //   else {
    //     alert('failed'+this.getStatus())
    //   }
    // },{enableHighAccuracy: true})
    // var myGeo = new BMap.Geocoder();
    // // 将地址解析结果显示在地图上,并调整地图视野
    // if(organAddress){
    //   myGeo.getPoint(organAddress, function(point){
    //     if (point) {
    //       map.centerAndZoom(point, 16);
    //       map.addOverlay(new BMap.Marker(point));
    //     }else{
    //       alert("您选择地址没有解析到结果!");
    //     }
    //   }, "广东");
    // }

  }
  render() {

    return (
      <div id="j-baidu-map" className="m-map-wrap">

      </div>
    )
  }
}
