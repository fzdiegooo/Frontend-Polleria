import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Producto, ProductoCarrito } from '../../../shared/models/Producto';
import { CarritoService } from '../../../core/services/carrito.service';
import ProductCard2Component from "../../../shared/components/product-card2/product-card2.component";
import { Cliente } from '../../../shared/models/User';
import { UserService } from '../../../core/services/user.service';
import { Pedido } from '../../../shared/models/Pedido';
import { PedidosService } from '../../../core/services/pedidos.service';
import { TipoEntregaService } from '../../../core/services/tipo-entrega.service';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCard2Component],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export default class CheckoutPaymentComponent implements OnInit {
  tipoComprobante: FormGroup;
  formFacturacion!: FormGroup;
  clienteData?: Cliente | null;
  productosCarrito: ProductoCarrito[] = [];
  totalCarrito = 0;
  tiposEntrega: any[] = [];

  constructor(private fb: FormBuilder, private tipoEntregaService: TipoEntregaService, private carritoService: CarritoService, private userService: UserService, private pedidoService: PedidosService) {
    this.tipoComprobante = this.fb.group({
      optionComprobante: ['boleta'],
    });

  }

  ngOnInit(): void {
    this.obtenerProductosCarrito();
    this.obtenerTotalCarrito();
    this.obtenerClienteData();
    this.obtenerTiposEntrega();
    console.log(this.clienteData);
    
    if (this.clienteData) {
      this.initializeFormWithClientData();
    } else {
      this.initializeFormForNewClient();
    }

    // Suscribirse a los cambios de 'optionComprobante' para habilitar/deshabilitar campos
    this.tipoComprobante.get('optionComprobante')?.valueChanges.subscribe(() => {
      this.toggleFieldsBasedOnComprobante();
    });

  }

  obtenerTiposEntrega(): void {
    this.tipoEntregaService.getTiposEntrega().subscribe(
      (tiposEntrega) => {
        this.tiposEntrega = tiposEntrega;
      },
      (error) => {
        console.error('Error al obtener los tipos de entrega:', error);
      }
    );
  }

  obtenerClienteData(): void {
    this.userService.userData$.subscribe((cliente) => {
      console.log(cliente);
      this.clienteData = cliente;
    });
  }

  obtenerRazonSocial(): void {
    if(this.formFacturacion.get('ruc')?.value.length === 11){
      this.userService.obtenerRazonSocial(this.formFacturacion.get('ruc')?.value).subscribe(
        (response) => {
          this.formFacturacion.get('razonSocial')?.setValue(response.razonSocial);
          this.formFacturacion.get('ruc')?.setErrors({invalidRuc: false})
        },
        (error) => {
          this.formFacturacion.get('ruc')?.setErrors({invalidRuc: true});
          this.formFacturacion.get('ruc')?.updateValueAndValidity();
        }
      );
    }else{
      this.formFacturacion.get('razonSocial')?.setValue('');
    }
    
  }

  obtenerProductosCarrito(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosCarrito = productos;
    });
  }

  obtenerTotalCarrito(): void {
    this.carritoService.totalCarrito$.subscribe((total) => {
      this.totalCarrito = total;
    });
  }

  invalidRucValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.hasError('invalidRuc')) {
        return { 'invalidRuc': 'RUC no válido o error al obtener la razón social.' };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.formFacturacion.valid) {
      console.log('Formulario enviado', this.formFacturacion.value);
      this.savePedido();
    } else {
      console.log('Formulario no válido', this.formFacturacion.value);
    }
  }

  savePedido(): void {
    const tipoEntregaSeleccionado = this.tiposEntrega.find(
      (tipo) => tipo.id === this.formFacturacion.value.tipoEntrega.id
    );
    // Construir el objeto Pedido a partir del formulario y los productos
    const pedido: Pedido = {
      fecha: new Date().toISOString(),
      usuario: { id: this.userService.userData.value!.id },
      estadoPedido: { id: 1 },
      tipoEntrega: tipoEntregaSeleccionado,
      detallePedidos: this.productosCarrito.map((producto: any) => ({
        precioNeto: producto.precioNeto, // Asegúrate de que estos campos existan en el producto
        cantidad: producto.cantidad,
        producto: { 
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          categoria: producto.categoria
        }
      }))
    };

    console.log('Pedido a guardar:', pedido);
    

    // Llamar al servicio para guardar el pedido
    this.pedidoService.guardarPedido(pedido).subscribe(
      (pedidoGuardado) => {
        console.log('Pedido guardado exitosamente:', pedidoGuardado);
        alert('Pedido guardado con éxito.');
        this.formFacturacion.reset();
        localStorage.removeItem('productos'); // Limpiar los productos del carrito
        this.productosCarrito = [];
      },
      (error) => {
        console.error('Error al guardar el pedido:', error);
        alert('Ocurrió un error al guardar el pedido.');
      }
    );
  }

  // Función para inicializar el formulario con los datos del cliente
  private initializeFormWithClientData(): void {
    this.formFacturacion = this.fb.group({
      nombre: [this.clienteData?.nombre || '', Validators.required],
      apellidos: [this.clienteData?.apellidos || '', Validators.required],
      tipoDocumento: [1],
      numeroDocumento: [this.clienteData?.numeroDocumento || '', Validators.required],
      razonSocial: [{ value: '', disabled: true }],
      ruc: ['', [Validators.required, Validators.minLength(11), this.invalidRucValidator()]],
      correo: [this.clienteData?.correo || '', [Validators.required]],
      telefono: [this.clienteData?.telefono || '', Validators.required],
      direccion: [this.clienteData?.direccion || ''],
      tipoEntrega: [1],
    });

    this.toggleFieldsBasedOnComprobante();
  }

  // Función para inicializar el formulario para un cliente nuevo
  private initializeFormForNewClient(): void {
    this.formFacturacion = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: [1],
      numeroDocumento: ['', Validators.required],
      razonSocial: [{ value: '', disabled: true }],
      ruc: ['', [Validators.required, Validators.minLength(11), this.invalidRucValidator()]],
      correo: ['', [Validators.required]],
      telefono: ['', Validators.required],
      direccion: [''],
      tipoEntrega: [1],
    });

  }

  // Función para habilitar/deshabilitar campos dependiendo del tipo de comprobante
  toggleFieldsBasedOnComprobante(): void {
    const optionComprobante = this.tipoComprobante.get('optionComprobante')?.value;

    if (optionComprobante === 'boleta') {
      this.formFacturacion.get('razonSocial')?.disable();
      this.formFacturacion.get('ruc')?.disable();
      this.formFacturacion.get('tipoDocumento')?.enable();
      this.formFacturacion.get('numeroDocumento')?.enable();
    }else if(optionComprobante === 'factura'){
      this.formFacturacion.get('razonSocial')?.enable();
      this.formFacturacion.get('ruc')?.enable();
      this.formFacturacion.get('tipoDocumento')?.disable();
      this.formFacturacion.get('numeroDocumento')?.disable();
    }
  }

}
