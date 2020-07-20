import { AjaxBasics } from '../../helpers/ajaxBasics'
it('test', async () => {
    // console.log("LENG: process.env", process.env.NODE_ENV)
    const res = await new AjaxBasics({ target: 'https://www.fastmock.site/mock/' }).Request({
        url: '/53dc2e8e86604568facd7a375a705c7d/test/api/test',
        body: { a: 1, b: 2, c: 3 }
    }).toPromise();
    // const res2 = await request_new.cache({ url: "https://www.easy-mock.com/mock/5a9130e5a2f38c18c96bce97/example/mock" });
    // console.log("TCL: res2", res2)

    console.log("TCL: res", res)
})