const { isAuth, isAdmin, isBasic, isAuthAndRole } = require('./authInfoValidations');

describe('Test middlewares if function correctlly.', function () {
  let reqInformations = {};
  it('should return false if request.information is undefined.', async function () {
    await expect(isAuth(reqInformations)).toBe(false);
  });
  const reqAuthFalse = { informations: {} };
  it('should return false if request.information.auth is false.', async function () {
    await expect(isAuth(reqAuthFalse)).toBe(false);
  });

  const reqAuthTrue = { informations: { auth: {} } };
  it('should return true if request.information.auth is true.', function () {
    expect(isAuth(reqAuthTrue)).toBe(true);
  });

  const reqAdminFalseBasicTrue = { informations: { auth: { roles: ['basic'] } } };
  const reqAdminTrueBasicFalse = { informations: { auth: { roles: ['admin'] } } };
  it('should return false if request.information.auth.roles haven\'t or have basic and admin.', function () {
    expect(isBasic(reqAdminTrueBasicFalse)).toBe(false);
    expect(isAdmin(reqAdminFalseBasicTrue)).toBe(false);
    expect(isBasic(reqAdminFalseBasicTrue)).toBe(true);
    expect(isAdmin(reqAdminTrueBasicFalse)).toBe(true);
  });

  it('should return if is allowed or status code', function () {
    isAuthAndRole(reqAuthFalse, 'basic', (result) => {
      expect(result).toBe(401);
    });
    isAuthAndRole(reqAdminTrueBasicFalse, 'admin', result => {
      expect(result).toBe('allowed');
    });
    isAuthAndRole(reqAdminTrueBasicFalse, 'basic', (result, msg) => {
      expect(result).toBe(403);
      expect(!!msg).toBe(true);
    });
  })

});