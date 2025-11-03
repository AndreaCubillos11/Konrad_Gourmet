import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Alertas {

  private socket: Socket;

  constructor() {
    const idUsuario = localStorage.getItem('id_usuario');
    console.log('🟡 Inicializando conexión Socket.IO para alertas con ID de usuario:', idUsuario);

    this.socket = io(`http://localhost:3000`, {
      transports: ['websocket'],
      query: { creador_id: idUsuario } // 👈 manda el parámetro como query
    });

    // Eventos de depuración
    this.socket.on('connect', () => {
      console.log('🟢 Conectado al servidor de alertas con ID de socket:', this.socket.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('🔴 Error al conectar con Socket.IO:', err.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('🟠 Desconectado del servidor de alertas:', reason);
    });
  }

  // Escucha cuando llega una alerta nueva desde el backend
  onAlertaNueva(): Observable<any> {
    return new Observable(observer => {
      console.log('📡 Escuchando evento "nueva-alerta" desde el servicio...');
      this.socket.on('nueva-alerta', (alerta: any) => {
        console.log('🚨 Nueva alerta recibida desde backend:', alerta);
        observer.next(alerta); // 👈 envía la alerta al componente
      });
    });
  }


  // Cierra la conexión si es necesario
  desconectar() {
    console.log('🔌 Desconectando socket de alertas...');
    this.socket.disconnect();
  }
}
