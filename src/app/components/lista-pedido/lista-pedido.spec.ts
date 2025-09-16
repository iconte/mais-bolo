import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedido } from './lista-pedido';

describe('ListaPedido', () => {
  let component: ListaPedido;
  let fixture: ComponentFixture<ListaPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
