import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() actions = {
    edit: false,
    view: false,
    status: false,
    add: false,
    viewAccount: false,
  };
  @Input() disableEditItemWithStatus = false;
  @Input() totalPages = 1;
  @Input() actualPage = 1;
  @Input() height: string | undefined;
  @Input() color: string | undefined;
  @Input() colorText: string | undefined;
  @Input() positionHeader: 'right' | 'center' | 'left' = 'left';
  @Input() positionCells: 'right' | 'center' | 'left' = 'left';
  @Input() border: string | undefined;
  @Input() viewId = false;
  @Input() viewStatus = false;
  @Input() paginator = true;

  @Output('add') addEvent = new EventEmitter<any>();
  @Output('status') changeStatusEvent = new EventEmitter<any>();
  @Output('edit') editEvent = new EventEmitter<any>();
  @Output('delete') deleteEvent = new EventEmitter<any>();
  @Output('view') viewEvent = new EventEmitter<any>();
  @Output('viewAccount') viewAccountEvent = new EventEmitter<any>();
  @Output('back') backEvent = new EventEmitter<any>();
  @Output('next') nextEvent = new EventEmitter<any>();

  keys: string[] = [];
  public id = parseInt(this.storageService.getValue('user').id);
  public currentUserRolId = parseInt(this.storageService.getValue('user').idRol);
  public dataView: any[] = [];

  constructor(
    public storageService: StorageService,
    public configService: ConfigurationService,
    private cdr: ChangeDetectorRef,
    private numberFormat: ShowThounsandDecimalsPipe
  ) { }

  ngOnChanges() {
    if (this.data?.length > 0) {
      this.initValues();
    }
  }

  ngOnInit(): void { }

  public initValues() {
    this.keys = Object.keys(this.data[0]);
    this.keys = this.keys.filter((item) => item != 'select');
    this.totalPages = Math.ceil(this.data.length / 10);
    this.data = this.data.map(item => ({
      ...item,
      btc: this.numberFormat.transform(item.btc),
      eth: this.numberFormat.transform(item.eth),
      usdt: this.numberFormat.transform(item.usdt),
      usd: this.numberFormat.transform(item.usd),
      id_rol: this.configService.profiles.find((x) => x.key === item.id_rol)?.role
    }))
    this.dataView = this.data.slice(0, 10);
    if (!this.viewId) this.keys = this.keys.filter((item) => item != 'id');
    if (!this.viewStatus)
      this.keys = this.keys.filter((item) => item != 'status');
  }

  get viewActions() {
    return this.actions.status || this.actions.edit || this.actions.view;
  }

  public onChange(item: any) {
    this.changeStatusEvent?.emit(item);
  }

  public handleEdit(item: any) {
    this.editEvent?.emit(item);
  }

  public handleView(item: any) {
    this.viewEvent?.emit(item);
  }

  public handleAddPackage(item: any) {
    this.addEvent?.emit(item);
  }

  public handleViewAccount(item: any) {
    this.viewAccountEvent?.emit(item);
  }

  public handleBack() {
    if (this.actualPage == 1) {
      return;
    }
    this.actualPage = this.actualPage - 1;
    this.dataView = this.data.slice(
      (this.actualPage * 10) - 10,
      this.actualPage * 10
    );
    this.cdr.detectChanges();
    this.backEvent?.emit();
  }

  public handleNext() {
    if (this.actualPage >= this.totalPages) {
      return;
    }
    this.actualPage = this.actualPage + 1;
    this.dataView = this.data.slice(
      (this.actualPage * 10) - 10,
      this.actualPage * 10
    );
    this.cdr.detectChanges();
    this.nextEvent?.emit();
  }
}
