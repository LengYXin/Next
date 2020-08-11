
import { ControllerAbout } from '../../entities'
import AjaxBasics from '../clientConfig'
import lodash from 'lodash'
const infiniteEvent = {
    complete: () => console.log('complete'),
    error: () => console.log('error'),
    loaded: () => console.log('loaded'),
    reset: () => console.log('reset')
}
describe('ControllerCourse', () => {
    const ctl = new ControllerAbout(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('dataSource', async () => {
        await ctl.onGetTypelist();
        const body = { columnId: lodash.head(ctl.typelist).key };
        await onLoading();
        async function onLoading() {
            await ctl.Pagination.onLoading(body, null, infiniteEvent);
            if (!ctl.Pagination.isUndefined) {
                return onLoading()
            }
        }
        expect(ctl.Pagination.dataSource.length).toBeTruthy();
    })
});