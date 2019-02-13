import {HousagotchiModule} from './housagotchi.module';

describe('HousagotchiModule', () => {
    let housagotchiModule: HousagotchiModule;

    beforeEach(() => {
        housagotchiModule = new HousagotchiModule();
    });

    it('should create an instance', () => {
        expect(housagotchiModule).toBeTruthy();
    });
});
