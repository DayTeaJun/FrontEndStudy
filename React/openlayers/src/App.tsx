import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';

const WindMap = () => {
  const mapRef = useRef(null); // 맵을 렌더링할 DOM 요소 참조

  axios.defaults.baseURL = 'http://localhost:3009';

  const getList = async () => {
    try {
      const response = await axios.get('/todos');
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    // 지도 초기화
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    // 임의의 바람 데이터 1,000개 생성
    const generateRandomWindData = (count) => {
      const windData = [];
      for (let i = 0; i < count; i++) {
        windData.push({
          lon: Math.random() * 360 - 180, // 경도 범위: -180 ~ 180
          lat: Math.random() * 180 - 90, // 위도 범위: -90 ~ 90
          speed: Math.random() * 2 + 0.5, // 속도: 0.5 ~ 2.5
          direction: Math.random() * Math.PI * 2, // 방향: 0 ~ 2π (랜덤)
        });
      }
      return windData;
    };

    const windData = generateRandomWindData(1000); // 1,000개의 임의 바람 데이터 생성

    // 좌표를 캔버스 좌표로 변환하는 함수
    function lonLatToPixel(lon, lat, map) {
      const coordinate = fromLonLat([lon, lat]);
      const pixel = map.getPixelFromCoordinate(coordinate);
      return pixel;
    }

    // 캔버스 레이어 생성
    const canvasLayer = new ImageLayer({
      source: new ImageCanvasSource({
        canvasFunction: function (
          extent,
          resolution,
          pixelRatio,
          size,
          projection
        ) {
          const canvas = document.createElement('canvas');
          canvas.width = size[0];
          canvas.height = size[1];
          const context = canvas.getContext('2d');

          // 입자 초기화
          const particles = [];
          for (let i = 0; i < windData.length; i++) {
            const randomPoint = windData[i];
            const startPixel = lonLatToPixel(
              randomPoint.lon,
              randomPoint.lat,
              map
            );
            particles.push({
              x: startPixel[0],
              y: startPixel[1],
              speed: randomPoint.speed,
              direction: randomPoint.direction,
            });
          }

          // 애니메이션을 위한 함수
          function animateParticles() {
            // 기존 입자를 덮어 입자의 잔상만 남김
            context.globalCompositeOperation = 'destination-in';
            context.fillStyle = 'rgba(0, 0, 0, 0.9)'; // 이전 프레임을 거의 지움 (잔상 유지)
            context.fillRect(0, 0, canvas.width, canvas.height);

            // 입자를 다시 그리기
            context.globalCompositeOperation = 'source-over'; // 새 입자 그리기
            particles.forEach((particle) => {
              context.beginPath();
              context.arc(particle.x, particle.y, 1.5, 0, 2 * Math.PI); // 입자 크기: 1.5
              context.fillStyle = 'rgba(0, 150, 255, 0.7)';
              context.fill();

              // 바람 데이터에 따라 입자 위치 업데이트
              particle.x += Math.cos(particle.direction) * particle.speed;
              particle.y += Math.sin(particle.direction) * particle.speed;

              // 화면 경계를 벗어나면 다시 시작 지점으로 이동
              if (
                particle.x > canvas.width ||
                particle.x < 0 ||
                particle.y > canvas.height ||
                particle.y < 0
              ) {
                const randomPoint =
                  windData[Math.floor(Math.random() * windData.length)];
                const startPixel = lonLatToPixel(
                  randomPoint.lon,
                  randomPoint.lat,
                  map
                );
                particle.x = startPixel[0];
                particle.y = startPixel[1];
              }
            });

            // 다음 프레임 애니메이션
            requestAnimationFrame(animateParticles); // 지속적으로 애니메이션을 호출
          }

          animateParticles(); // 애니메이션 초기화
          return canvas;
        },
      }),
    });

    // 캔버스 레이어 추가
    map.addLayer(canvasLayer);

    // 강제로 지도 렌더링 업데이트 (애니메이션 유지)
    const renderInterval = setInterval(() => {
      map.render(); // 지도를 강제로 다시 렌더링
    }, 50); // 50ms마다 지도 다시 렌더링

    // 컴포넌트 언마운트 시 지도를 제거
    return () => {
      clearInterval(renderInterval); // 인터벌 정리
      map.setTarget(null); // 지도 제거
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default WindMap;
