import AuthService from "./AuthService";
import coreModule from "./CoreModule";

describe('TimeService', () => {
    let TimeService;

    beforeEach(() => {
        angular.mock.module(coreModule.name);

        inject((_TimeService_) => {
            TimeService = _TimeService_;
        });
    });

    it('should remove timezone offset', () => {
        // arrange
        let dt = new Date(1000000000);

        // act
        let result = TimeService.removeTimeOffset(dt);

        // assert
        expect(JSON.stringify(result)).toEqual('"1970-01-12T00:00:00.000Z"');
    });

    it('should stay undefined', () => {
        // arrange
        let dt = undefined;

        // act
        let result = TimeService.removeTimeOffset(dt);

        // assert
        expect(result).toBeUndefined();
    });

    it('should format minutes format', () => {
        // arrange
        let minutes = 120;

        // act
        let result = TimeService.formatMinutesToLongHoursFormat(minutes);

        // assert
        expect(JSON.stringify(result)).toEqual('"2:00"');
    });

    it('should format centi format', () => {
        // arrange
        let centi = 120;

        // act
        let result = TimeService.formatMinutesToLongHoursFormat(centi, "100min");

        // assert
        expect(JSON.stringify(result)).toEqual('"1.60"');
    });

});
