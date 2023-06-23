# -*- coding: utf-8 -*-

from odoo import api, fields, models, _


class MrpProduction(models.Model):
    _inherit = 'mrp.production'
    def get_record_for_barcode(self,barcode):
        record_id = self.search([('name','=',barcode)])
        return{
                    'type': 'ir.actions.act_window',
                    'res_model': 'mrp.production',
                   'views': [[False, 'form']],
                    'res_id': record_id.id}