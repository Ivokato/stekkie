export const toNodeList = html => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  return wrapper.children;
};

export const toElement = html => toNodeList(html)[0];
