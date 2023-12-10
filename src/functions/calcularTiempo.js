export function mensajeTiempo(tiempo) {
    var fechaCreacionUsuario = new Date(tiempo);
    var fechaActual = new Date();
    var diferenciaTiempo = fechaActual - fechaCreacionUsuario;
  
    var segundosTranscurridos = Math.floor(diferenciaTiempo / 1000);
    var minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
    var horasTranscurridas = Math.floor(minutosTranscurridos / 60);
    var diasTranscurridos = Math.floor(horasTranscurridas / 24);
    var semanasTranscurridas = Math.floor(diasTranscurridos / 7);
    var mesesTranscurridos = fechaActual.getMonth() - fechaCreacionUsuario.getMonth() + (12 * (fechaActual.getFullYear() - fechaCreacionUsuario.getFullYear()));
    var añosTranscurridos = fechaActual.getFullYear() - fechaCreacionUsuario.getFullYear();
  
    if (segundosTranscurridos < 60) {
      return "Hace un momento";
    } else if (minutosTranscurridos < 60) {
      return "Hace " + minutosTranscurridos + " minutos";
    } else if (horasTranscurridas < 24) {
      return "Hace " + horasTranscurridas + " horas";
    } else if (diasTranscurridos < 7) {
      return "Hace " + diasTranscurridos + " días";
    } else if (semanasTranscurridas < 4) {
      return "Hace " + semanasTranscurridas + " semana(s)";
    } else if (mesesTranscurridos < 12) {
      return "Hace " + mesesTranscurridos + " mes(es)";
    } else {
      return "Hace " + añosTranscurridos + " año(s)";
    }
  }