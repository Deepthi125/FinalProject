sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";

        return Controller.extend("smartproject1.controller.View1", {
            onInit: function () {
                this.getOwnerComponent().getModel().setDefaultBindingMode("TwoWay");
                this.orouter = this.getOwnerComponent().getRouter();
                this.orouter.getRoute("RouteView1").attachPatternMatched(null,function(oEvent){
                    this.categoryID = oEvent.mParameters.arguments.CateID;
                    this.getView().byId("SmartTable").rebindTable();  //Refreshing Smart Table
                },this)
            },

            OnBeforeRebindTable: function (oEvent) {
                if (this.categoryID && this.categoryID != "Null") {
                    var binding = oEvent.getParameter("bindingParams");
                    var ofilter = new sap.ui.model.Filter({
                        path: "Category/ID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: this.categoryID
                    });
                    binding.filters.push(ofilter);
                }
            },

            onDelete: function () {
                var oTable = this.getView().byId("SmartTable").getTable();
                var selectedRows = oTable.getSelectedIndices();
                if (selectedRows.length != 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    var Data = oTable.getContextByIndex(selectedRows[i]).getObject();
                    this.getView().getModel().remove("/Products(" + Data.ID + ")", {
                        success: function () {
                            sap.m.MessageToast.show("Successfully Deleted");
                        },
                        error: function () {
                            sap.m.MessageToast.show("Error in Deletion");
                        }
                    })
                }
                }
                else {
                    sap.m.MessageToast.show("Please select atleast single row for Deletion");
                    oTable.clearSelection();
                }
            },

            onRecordUpdate: function () {
                var oTable = this.getView().byId("SmartTable").getTable();
                var selectedRows = oTable.getSelectedIndices();
                if (selectedRows.length != 0) {
                for (var i = 0; i < selectedRows.length; i++) {
                    var Data = oTable.getContextByIndex(selectedRows[i]).getObject();
                    this.getView().getModel().update("/Products(" + Data.ID + ")", Data, {
                        success: function () {
                            sap.m.MessageToast.show("Update is successful");
                        },
                        error: function () {
                            sap.m.MessageToast.show("Error in Updation");
                        }
                    })
                }
                }
                else{
                    sap.m.MessageToast.show("Please select atleast single row for Updation");
                    oTable.clearSelection();
                }
            }
        });
    });
