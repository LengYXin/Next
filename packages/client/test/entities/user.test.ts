
import { ControllerUser } from '../../entities'
import AjaxBasics from '../clientConfig'
describe('ControllerCourse', () => {
    const ctl = new ControllerUser(AjaxBasics);
    // Applies only to tests in this describe block
    // beforeEach(() => {
    //     return initializeFoodDatabase();
    // });
    it('Login', async () => {
        await ctl.onLogin('18611752863', 'leng147896325')
    })
});