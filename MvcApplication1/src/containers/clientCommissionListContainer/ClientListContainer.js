"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ClientCommissionListContainer_1 = require("./ClientCommissionListContainer");
var ClientListComponent_1 = require("../../components/ClientListComponent/ClientListComponent");
var mapStateToProps = function (state) { return ({}); };
exports.ClientListContainer = react_redux_1.connect(mapStateToProps, ClientCommissionListContainer_1.mapDispatchToProps)(ClientListComponent_1.default);
