import { useEffect, useRef } from 'react';
import { Map as OlMap, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { defaults } from 'ol/control/defaults';

export default function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tilelayer = new TileLayer({
      source: new OSM({ attributions: '' }),
    });
    const view = new View({
      center: fromLonLat([126.9783785, 37.5666612]),
      zoom: 14,
    });

    const map = new OlMap({
      controls: defaults({ zoom: false, rotate: false, attribution: false }),
      layers: [tilelayer],
      view: view,
    });
    map.setTarget(mapRef.current || '');
    return () => {
      map.setTarget('');
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ width: '100%', height: '100%' }} ref={mapRef} />
    </div>
  );
}
