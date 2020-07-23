import { ControllerCourse } from '../../entities'
import AjaxBasics from '../clientConfig'
describe('ControllerCourse', () => {
    const ctl = new ControllerCourse(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('onGetDataSource', async () => {
        await ctl.onGetDataSource({ "pageIndex": 1, "columnId": 1, "sortType": 1, "sortName": "Asc", "courseStyle": "1" })
        expect(ctl.dataSource.length).toBeTruthy();
    })
});