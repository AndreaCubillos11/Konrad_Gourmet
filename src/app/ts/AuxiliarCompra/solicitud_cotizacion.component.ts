import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrarPlatoService } from '../../services/JefeCocina/registrar-plato';
import { Solicitudes } from '../../services/JefeCocina/solicitudes';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalNotificacionComponent } from '../../shared/modal-notificacion/modal-notificacion';
import { Proveedores } from '../../services/Administrador/proveedores';
import { jsPDF } from 'jspdf';
import { EmailService } from '../../services/email-service';
import { UsuarioService } from '../../services/Administrador/usuario-service';

@Component({
    selector: 'app-solicitud-cotizacion',
    templateUrl: '../../html/AuxiliarCompra/solicitud_cotizacion.html',
    styleUrls: ['../../css/solicitud_cotizacion.css'],
    imports: [CommonModule, ReactiveFormsModule, ModalNotificacionComponent]
})
export class SolicitudCotizacionComponent {
    solicitudes: any[] = [];
    cotizacionForm!: FormGroup;
    proveedores: any[] = [];
    proveedorSeleccionado: any;
    usuarios: any;

    modalVisible: boolean = false;
    modalTipo: 'exito' | 'error' = 'exito';
    modalTitulo: string = '';
    modalMensaje: string = '';

    constructor(
        private fb: FormBuilder,
        private registrarPlatoService: RegistrarPlatoService,
        private cookieService: CookieService,
        private router: Router,
        private solicitudeService: Solicitudes,
        private proveedorService: Proveedores,
        private emailService: EmailService,
        private usuarioService: UsuarioService
    ) {
        this.cotizacionForm = this.fb.group({
            id_solicitud: [0, Validators.required],
            id_proveedor: [0, Validators.required],
            fecha_maxima_resp: []
        });
    }

    ngOnInit() {
        this.consultarSolicitudes();
        this.obtenerProveedores();
        this.cargarDatos();
    }

    /** 
     * Genera el PDF en memoria
     */
    generarPDF(solicitud: any): Blob {
        const datos = {
            fecha: this.cotizacionForm.value.fecha_maxima_resp || 'No definida',
            producto: solicitud.Producto?.nombre || 'Desconocido',
            cantidad: solicitud.cantidad + ' ' + (solicitud.Unidad?.nombre_unidad || ''),
            marca: solicitud.Marca?.nombre_marca || 'SIN DEFINIR'
        };

        const doc = new jsPDF();
        doc.text('Solicitud de Cotización', 20, 20);
        doc.text(`Fecha máxima de respuesta: ${datos.fecha}`, 20, 40);
        doc.text(`Producto: ${datos.producto}`, 20, 50);
        doc.text(`Cantidad: ${datos.cantidad}`, 20, 60);
        doc.text(`Marca: ${datos.marca}`, 20, 70);

        return doc.output('blob');
    }

    /**
     * Envía el correo con el PDF adjunto (al backend)
     */
    async enviarCotizacion(solicitud: any) {
        try {
            const proveedorSeleccionado = this.proveedores.find(
                p => p.id_proveedor === Number(this.cotizacionForm.value.id_proveedor)
            );

            if (!proveedorSeleccionado) {
                alert('Selecciona un proveedor antes de enviar.');
                return;
            }

            //Espera a que los datos del usuario estén disponibles (solo si no se han cargado aún)
            if (!this.usuarios) {
                console.log('Esperando datos del usuario antes de enviar...');
                await this.cargarDatos();
            }

            //Verificación final
            if (!this.usuarios) {
                throw new Error('No se pudo cargar el usuario.');
            }

            // Generar PDF
            const pdfBlob = this.generarPDF(solicitud);

            // Crear cuerpo del correo
            const formData = new FormData();
            formData.append('emailDestino','felipearenast16@gmail.com'); //proveedorSeleccionado.correo
            formData.append('asunto', 'Solicitud de cotización');
            formData.append(
                'mensaje',
                `Estimado/a ${proveedorSeleccionado.nombre}:

Reciba un cordial saludo.

Por medio del presente correo, enviamos la solicitud de cotización en formato PDF, donde se especifican los productos, cantidades y condiciones requeridas.

Agradecemos su amable atención y solicitamos nos envíe su propuesta con la información correspondiente.

Atentamente,
Equipo Konrad_Gourmet
${this.usuarios.nombre}
${localStorage.getItem('rol')}
${this.usuarios.correo}`
            );
            formData.append('pdf', pdfBlob, 'solicitud_cotizacion.pdf');

            // Enviar correo al backend
            await this.emailService.enviarCorreo(formData).toPromise();

            // Mostrar modal de éxito
            this.modalTipo = 'exito';
            this.modalTitulo = 'Cotización enviada';
            this.modalMensaje = `Correo enviado a ${proveedorSeleccionado.nombre}`;
            this.modalVisible = true;

        } catch (err) {
            console.error('Error al enviar cotización:', err);
            this.modalTipo = 'error';
            this.modalTitulo = 'Error';
            this.modalMensaje = 'No se pudo enviar el correo.';
            this.modalVisible = true;
        }
    }


    consultarSolicitudes() {
        const token = this.cookieService.get('token');
        this.solicitudeService.getSolicitudes(token, localStorage.getItem('id_usuario')).subscribe((data) => {
            this.solicitudes = data.solicitudes;
        });
    }

    obtenerProveedores() {
        this.proveedorService.consultarProveedores(localStorage.getItem('id_usuario'), this.cookieService.get('token')).subscribe({
            next: (data) => {
                this.proveedores = data.proveedores;
            },
            error: (err) => console.error('Error al consultar proveedores:', err)
        });
    }

    cargarDatos(): Promise<void> {
        return new Promise((resolve, reject) => {
            const idUsuario = Number(localStorage.getItem('id_usuario'));

            this.usuarioService.consultarUsuarios(idUsuario, this.cookieService.get('token')).subscribe({
                next: (data: any) => {
                    const usuarioFiltrado = data.usuarios.find((u: any) => u.id_usuario === idUsuario);
                    this.usuarios = usuarioFiltrado;

                    console.log('Usuario cargado:', this.usuarios);
                    resolve();
                },
                error: (error) => {
                    console.error('Error cargando usuario:', error);
                    reject(error);
                }
            });
        });
    }

    cerrarModal() {
        this.modalVisible = false;
    }
}
