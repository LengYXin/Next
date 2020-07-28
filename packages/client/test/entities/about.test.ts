
import { ControllerAbout } from '../../entities'
import AjaxBasics from '../clientConfig'
import lodash from 'lodash'
describe('ControllerCourse', () => {
    const ctl = new ControllerAbout(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('dataSource', async () => {
        await ctl.onGetTypelist();
        await ctl.Pagination.onReset().onLoading({ columnId: lodash.head(ctl.typelist).typeId })
        expect(ctl.Pagination.dataSource.length).toBeTruthy();
    })
});