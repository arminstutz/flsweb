import * as angular from "angular";
import {FlightStateMapper} from "./FlightsServices";

export default class FlightStateFilterDropdownDirective {
    static factory() {
        return {
            restrict: 'E',
            require: '^ngModel',
            template: `
                <div>
                    <input class="form-control" ng-model="filterIndicator" ng-click="toggleEditor()" readonly>
                    <div ng-if="editorVisible"
                         class="flight-state-choice-dropdown">
                        <div class="flight-state-choices">
                            <div class="flight-state-choice-list">
                                <label translate="GLIDER_STATES"></label>
                                <ul>
                                   <li><span class="lnr lnr-hand glider-state-icon"></span> <input type="checkbox" ng-model="states.glider.ready" ng-click="updateIndicator()"> <span translate="GLIDER_READY"></span></li>
                                   <li><span class="fa fa-cloud glider-state-icon"></span> <input type="checkbox" ng-model="states.glider.inAir" ng-click="updateIndicator()"> <span translate="GLIDER_IN_AIR"></span></li>
                                   <li><span class="lnr lnr-checkmark-circle glider-state-icon"></span> <input type="checkbox" ng-model="states.glider.landed" ng-click="updateIndicator()"> <span translate="GLIDER_LANDED"></span></li>
                                   <li><span class="lnr lnr-lock glider-state-icon"></span> <input type="checkbox" ng-model="states.glider.locked" ng-click="updateIndicator()"> <span translate="GLIDER_LOCKED"></span></li>
                                </ul>
                            </div>
                            <div class="flight-state-choice-list">
                                <label translate="TOW_STATES"></label>
                                <ul>
                                   <li><span class="lnr lnr-hand tow-state-icon"></span> <input type="checkbox" ng-model="states.tow.ready" ng-click="updateIndicator()"> <span translate="TOW_READY"></span></li>
                                   <li><span class="fa fa-cloud tow-state-icon"></span> <input type="checkbox" ng-model="states.tow.inAir" ng-click="updateIndicator()"> <span translate="TOW_IN_AIR"></span></li>
                                   <li><span class="lnr lnr-checkmark-circle tow-state-icon"></span> <input type="checkbox" ng-model="states.tow.landed" ng-click="updateIndicator()"> <span translate="TOW_LANDED"></span></li>
                                   <li><span class="lnr lnr-lock tow-state-icon"></span> <input type="checkbox" ng-model="states.tow.locked" ng-click="updateIndicator()"> <span translate="TOW_LOCKED"></span></li>
                                </ul>
                            </div>
                        </div>
                        <button class="btn btn-default pull-right" style="margin-top:10px;" ng-click="toggleEditor()" translate="CLOSE"></button>
                        <button class="btn btn-default pull-left" style="margin-top:10px;" ng-click="reset()" translate="ALL"></button>
                    </div>
                </div>
            `,
            scope: {
                ngModel: '=',
            },
            link: function (scope, element, attrs, modelCtrl) {
                scope.states = scope.ngModel || Object.assign({}, FlightStateMapper.allFlightStates());

                scope.updateIndicator = () => {
                    if(FlightStateMapper.anyStateDisabled(scope.states.glider) || FlightStateMapper.anyStateDisabled(scope.states.tow)) {
                        scope.filterIndicator = "*";
                    } else {
                        scope.filterIndicator = "";
                    }
                    modelCtrl.$setViewValue(scope.states);
                };

                scope.reset = () => {
                    scope.states = Object.assign({}, FlightStateMapper.allFlightStates());
                    scope.updateIndicator();
                };

                scope.toggleEditor = () => {
                    scope.editorVisible = !scope.editorVisible;
                };
                

                scope.updateIndicator();
            }
        };
    };
}