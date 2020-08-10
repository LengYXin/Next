
import { ControllerStationery } from '../../entities'
import AjaxBasics from '../clientConfig'
import lodash from 'lodash'
describe('ControllerCourse', () => {
    const ctl = new ControllerStationery(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('dataSource', async () => {
        await ctl.onGetTypelist();
        await ctl.Pagination.onReset().onLoading({ typeId: lodash.head(ctl.typelist).key })
        expect(ctl.Pagination.dataSource.length).toBeTruthy();
    })
});