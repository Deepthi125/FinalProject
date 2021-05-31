sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";

        return Controller.extend("smartproject1.controller.Category", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                var catData = {
                    "ID": "",
                    "Name": "",
                    "Products": []
                };
                var proData = {
                    "ID": "",
                    "Name": "",
                    "Description": "",
                    "Price": "",
                    "Rating": "",
                    "DiscontinuedDate": "",
                    "ReleaseDate": ""
                };

                var oCatModel = new sap.ui.model.json.JSONModel(catData);
                this.getOwnerComponent().setModel(oCatModel, "CategoryModel");

                var oProModel = new sap.ui.model.json.JSONModel(proData);
                this.getOwnerComponent().setModel(oProModel, "ProductModel");

            },

            _OnCatSave: function () {

                var that = this;
                var catData = {
                    "ID": "",
                    "Name": "",
                    "Products": []
                };                
                var catData2 = this.getOwnerComponent().getModel("CategoryModel").getData();
                this.getView().getModel().create("/Categories", catData2, {
                    success: function () {
                        that.CateFragmentLoad.close();
                        that.getOwnerComponent().getModel("CategoryModel").setData(catData);
                        sap.m.MessageToast.show("Successfully Created");
                        that.getView().byId("SmartTable").rebindTable();
                    },
                    error: function () {
                        sap.m.MessageToast.show("Error in Creation");
                    }
                })
            },

            _OnProductSave: function () {
                var proData1 = this.getOwnerComponent().getModel("ProductModel").getData();
                var catData1 = this.getOwnerComponent().getModel("CategoryModel").getData();
                proData1.DiscontinuedDate=new Date();
                proData1.ReleaseDate=new Date();
                catData1.Products.push(JSON.parse(JSON.stringify(proData1)));
                this.getOwnerComponent().getModel("CategoryModel").setData(catData1);
                this.ProdFragmentLoad.close();
                //that.getOwnerComponent().getModel("ProductModel").setData({});
            },

            _OnCatClose: function () {
                this.CateFragmentLoad.close();
            },

            _OnProdClose: function () {
                this.ProdFragmentLoad.close();
            },

            _OnRowNavigate: function (oEvent) {
                var cateid = oEvent.mParameters.row.mAggregations.cells[0].mProperties.text
                this.oRouter.navTo("RouteView1", {
                    CateID: cateid
                });
            },

            _onDisplayProducts: function () {
                this.oRouter.navTo("RouteView1", {
                    CateID: "Null"
                });
            },

            _OnAddProduct: function () {
                if (!this.ProdFragmentLoad) {
                    this.ProdFragmentLoad = sap.ui.xmlfragment(this.getView().getId(),
                        "smartproject1.view.CreateProduct", this);
                    this.getView().addDependent(this.ProdFragmentLoad);
                }
                this.ProdFragmentLoad.open();
            },

            _onCreate1: function () {
                if (!this.CateFragmentLoad) {
                    this.CateFragmentLoad = sap.ui.xmlfragment(this.getView().getId(),
                        "smartproject1.view.CreateCategory", this);
                    this.getView().addDependent(this.CateFragmentLoad);
                }
                this.CateFragmentLoad.open();

                /*var oData = {
                    "ID": 4,
                    "Name": "Jewllery4",
                    "Products": [
                        {
                            "ID": 11,
                            "Name": "Necklace4",
                            "Price": "500",
                            "Rating": 5
                        },
                        {
                            "ID": 12,
                            "Name": "Bangles4",
                            "Price": "900",
                            "Rating": 4
                        }

                    ]

                };
                var that = this;
                this.getView().getModel().create("/Categories()", oData, {
                    success: function () {
                        that.getView().byId("SmartTable").rebindTable();
                    }
                })*/
            },

            _onDelete1: function () {
                var that = this;
                var oTable = this.getView().byId("SmartTable").getTable();
                var selectedRows = oTable.getSelectedIndices();
                if (selectedRows.length != 0) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        var Data = oTable.getContextByIndex(selectedRows[i]).getObject();
                        this.getView().getModel().remove("/Categories(" + Data.ID + ")", {
                            success: function () {
                                sap.m.MessageToast.show("Successfully Deleted");
                                that.getView().byId("SmartTable").rebindTable();
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
            }

        });
    });
