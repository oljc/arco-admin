const debug = import.meta.env.MODE !== 'production';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    success: true,
    msg: '请求成功',
    code: 200
  };
};

export const failResponseWrap = (data: unknown, msg: string, code = 50000) => {
  return {
    data,
    success: false,
    msg,
    code
  };
};
