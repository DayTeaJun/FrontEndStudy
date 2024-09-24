import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import { Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { WindLayer } from 'ol-wind';

mapboxgl.accessToken =
  'pk.eyJ1IjoidTEwaW50IiwiYSI6InQtMnZvTkEifQ.c8mhXquPE7_xoB3P4Ag8cA';

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

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
          },
          // 추가적인 GeoJSON 데이터 입력
        ],
      }),
    });

    vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const styles = {
          Point: new Style({
            image: new CircleStyle({
              radius: 5,
              stroke: new Stroke({ color: 'red', width: 1 }),
            }),
          }),
          Polygon: new Style({
            stroke: new Stroke({
              color: 'blue',
              lineDash: [4],
              width: 3,
            }),
            fill: new Fill({
              color: 'rgba(0, 0, 255, 0.1)',
            }),
          }),
        };
        return styles[feature.getGeometry().getType()];
      },
    });

    olMap.addLayer(vectorLayer);

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

  return (
    <>
      <div
        ref={olMapRef}
        style={{ display: 'flex', width: '100vw', height: '100vh' }}
      ></div>
    </>
  );
};

export default WindMap;
