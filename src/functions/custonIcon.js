import L from 'leaflet'; // Importa la clase L.Icon

export const createCustomIcon = (ubi) => {

    if(!ubi){
      return new L.Icon({
        iconUrl: "https://res.cloudinary.com/dzemdgvqo/image/upload/v1699558874/resources/qiemxfgznvtczn7arord.png",
        iconSize: [35,40], // Tamaño del icono
        iconAnchor: [35, 40], // Punto de anclaje del icono
        popupAnchor: [-22, -35] // Punto de anclaje del popup
      });
    }
    let iconUrl = '';
    
    // Evalúa el valor de ubi.titulo y asigna la URL del icono correspondiente
    switch (ubi.titulo) {
      case "Infraestructura":
        iconUrl = 'https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/vefmcfkikelooasz5nvd.png';
        break;
      case "Comunitario":
        iconUrl = 'https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/kfht1h0vfzqtiwvsg69f.png';
        break;
      case "Otro":
        iconUrl = 'https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/uur2w8klqlfslgn8p1dn.png';
        break;
      case "Servicios":
        iconUrl = 'https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/or2jtgccqrlpbvplvlmx.png';
        break;
      default:
        iconUrl = 'https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553393/resources/pl2cqanvfql6vpw0stls.png';
    }
  
    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [35,40], // Tamaño del icono
      iconAnchor: [35, 40], // Punto de anclaje del icono
      popupAnchor: [-22, -35] // Punto de anclaje del popup
    });
  };