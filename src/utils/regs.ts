/** 8～16位密码正则 */
export const passWordReg = /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/

/** emailReg */
export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/** 手机号和邮箱验证 */
export const phoneReg = /^1[3456789]\d{9}$/

export const phoneEmailReg = /^1[3456789]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/** 1～99岁数字正则 */
export const ageReg = /^[1-9][0-9]{0,1}$/

/** 1～9999数字正则 */
export const num9999Reg = /^[1-9][0-9]{0,3}$/

/** 正整数数字正则 */
export const maxNumReg = /^[1-9][0-9]{0,}$/
