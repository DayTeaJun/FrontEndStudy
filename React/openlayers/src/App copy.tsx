import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { WindLayer } from 'ol-wind';

const WindMap = () => {
  const olMapRef = useRef(null); // OpenLayers를 위한 참조

  // OpenLayers 초기화
  const initOpenLayers = () => {
    const olMap = new OLMap({
      target: olMapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([113.5345, 34.441]), // 초기 지도 중심 설정 (중국 중부)
        zoom: 2, // 줌 레벨 설정
      }),
    });

    // 직접 제공한 바람 데이터
    const formattedWindData = {
      header: {
        parameterCategory: 1,
        parameterNumber: 2,
        la1: 90.5, // 북위 시작점
        la2: -90.5, // 남위 끝점
        lo1: -180.5, // 서경 시작점
        lo2: 179.5, // 동경 끝점
        nx: 360, // x축 격자 수
        ny: 181, // y축 격자 수
        dx: 1, // 격자 간격 (경도)
        dy: 1, // 격자 간격 (위도)
        GRIB_COMMENT: 'u-component of wind [m/s]',
        GRIB_UNIT: '[m/s]',
      },
      data: [
        -4.376064453125, // 10m U 바람 성분
        -5.807470703125, // 10m V 바람 성분
        4.44362060546875, // 100 hPa U 바람 성분
        8.8597412109375, // 100 hPa V 바람 성분
        19.411904907226564, // 300 hPa U 바람 성분
        12.310589599609376, // 300 hPa V 바람 성분
        5.2234814453125, // 700 hPa U 바람 성분
        2.677958984375, // 700 hPa V 바람 성분
        1.01080322265625, // 850 hPa U 바람 성분
        -1.0381011962890625, // 850 hPa V 바람 성분
      ],
    };

    const windLayer = new WindLayer(formattedWindData, {
      windOptions: {
        velocityScale: 1 / 20, // 바람 경로의 속도 스케일
        paths: 5000, // 바람 경로의 개수
        colorScale: () => {
          return '#3c90ff'; // 바람 경로의 색상 (파란색)
        },
        width: 3, // 바람 경로의 두께
        generateParticleOption: true, // 입자 기반의 애니메이션 활성화
      },
      projection: 'EPSG:4326', // 좌표계 설정 (경위도)
    });

    olMap.addLayer(windLayer); // 바람 데이터를 OpenLayers에 추가
  };

  useEffect(() => {
    initOpenLayers();
  }, []);

  return <div ref={olMapRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default WindMap;
