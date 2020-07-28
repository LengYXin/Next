import { ControllerCourse } from '../../entities'
import AjaxBasics from '../clientConfig'
describe('ControllerCourse', () => {
    const ctl = new ControllerCourse(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('dataSource', async () => {
        await ctl.Pagination.onReset().onLoading()
        expect(ctl.Pagination.dataSource.length).toBeTruthy();
    })
});