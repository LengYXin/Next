import { ControllerHome } from '../../entities'
import AjaxBasics from '../clientConfig'
import { toJS } from 'mobx';
// jest.setTimeout(300000);
describe('ControllerHome', () => {
    const ctl = new ControllerHome(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('onGetBanners', async () => {
        await ctl.onGetBanners()
        expect(ctl.Banners.length).toBeTruthy();
    })
});