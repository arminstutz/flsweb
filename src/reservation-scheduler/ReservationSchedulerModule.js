import angular from 'angular';
import coreModule from '../core/CoreModule';
import {userAuth} from '../core/AuthService';
import 'ng-table';
import ReservationSchedulerController from './ReservationSchedulerController';
import reservationsModule from '../reservations/ReservationsModule';
import aircraftsModule from '../masterdata/aircrafts/AircraftsModule';

export default angular.module('fls.reservations.scheduler', [
    'ngTable',
    coreModule.name,
    aircraftsModule.name,
    reservationsModule.name
])
    .controller('ReservationSchedulerController', ReservationSchedulerController)
    .config(($routeProvider) => {
        $routeProvider
            .when('/reservation-scheduler',
            {
                controller: ReservationSchedulerController,
                template: require('./reservation-scheduler.html'),
                publicAccess: true,
                resolve: {
                    user: userAuth,
                    titleKey: () => "RESERVATIONS"
                }
            });
    });