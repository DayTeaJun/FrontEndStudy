import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
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
        center: fromLonLat([113.5345, 34.441]),
        zoom: 2,
      }),
    });

    // WindLayer 처리
    fetch(
      'https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/json/wind.json'
    )
      .then((res) => res.json())
      .then((windData) => {
        const windLayer = new WindLayer(windData, {
          windOptions: {
            velocityScale: 0.05,
            paths: 3200,
            lineWidth: 3,
          },
        });
        olMap.addLayer(windLayer);
      });
  };

  useEffect(() => {
    initOpenLayers();
  }, []);

  return <div ref={olMapRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default WindMap;
