/** @odoo-module **/
var rpc = require('web.rpc');

import { listView } from "@web/views/list/list_view";
import { ListRenderer } from "@web/views/list/list_renderer";
import { ListController } from "@web/views/list/list_controller";
import { registry } from "@web/core/registry";

import { useBus, useService } from "@web/core/utils/hooks";


class ManufacturingBarcode extends ListRenderer {
    setup() {
        super.setup();

        const barcode = useService("barcode");
        useBus(barcode.bus, "barcode_scanned", this.onBarcodeScanned);





    }



       onBarcodeScanned(event) {
        const { barcode } = event.detail;
      var self =this
     var domain = [['id','=',4]];
     var fields = ['id'];


    rpc.query({
         model: 'mrp.production',
         method: 'get_record_for_barcode',
         args: ['',barcode],
    }).then(function (data) {

console.log("yes")


self.env.services.action.doAction(data)


    });














    }





}
ManufacturingBarcode.components = {
    ...ListRenderer.components,
    ManufacturingBarcode,
};

export class ManufacturingBarcodeController extends ListController {}


export const ManufacturingBarcodeControllerListView = {
    ...listView,
    Controller: ManufacturingBarcodeController,
    Renderer: ManufacturingBarcode
};






registry.category("views").add("add_barcode_scaner_popup", ManufacturingBarcodeControllerListView);
