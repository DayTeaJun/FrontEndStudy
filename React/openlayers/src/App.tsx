import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import { Vector as VectorLayer, ImageStatic } from 'ol/layer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Draw, Modify, Snap } from 'ol/interaction';
import { WindLayer } from 'ol-wind';

mapboxgl.accessToken =
  'pk.eyJ1IjoidTEwaW50IiwiYSI6InQtMnZvTkEifQ.c8mhXquPE7_xoB3P4Ag8cA';

const WindMap = () => {
  const mapboxMapRef = useRef(null); // Mapbox를 위한 참조
  const olMapRef = useRef(null); // OpenLayers를 위한 참조

  // Mapbox 초기화
  const initMapbox = () => {
    const map = new mapboxgl.Map({
      container: mapboxMapRef.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background',
            layout: {
              visibility: 'none',
            },
          },
        ],
      },
      center: { lng: 105.7015, lat: 22.7602 },
      zoom: 0,
      antialias: true,
    });

    map.on('load', () => {
      // Mapbox와 바람 레이어 관리
      const source = new mapboxgl.TileSource({
        tileSize: 256,
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        minZoom: 0,
        maxZoom: 18,
        wrapX: true,
      });

      let flag = 0;
      map.on('click', () => {
        flag = flag === 0 ? 1 : 0;
        source.update(
          {
            url:
              flag === 0
                ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          },
          false
        );
      });
    });
  };

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
    initMapbox();
    initOpenLayers();
  }, []);

  return (
    <>
      <div ref={mapboxMapRef} style={{ width: '100vw', height: '50vh' }} />
      <div ref={olMapRef} style={{ width: '100vw', height: '100vh' }} />
    </>
  );
};

export default WindMap;
