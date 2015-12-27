import jsdom from 'jsdom';

function today() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return '' + year + month + day;
}

function getNBAGameListUrl(day) {
  return 'http://www.nba.com/gameline/' + day + '/';
}

function getNBAGameList(url, cb) {
  let lst = [];
  jsdom.env(url, (err, window) => {
    if (err) {
      return cb(err);
    }

    let document = window.document;
    let elems = document.querySelectorAll('.nbaActionBar .nbaActionRow a.recapAnc');
    for (let i = 0, len = elems.length; i < len; ++i) {
      let el = elems[i];
      lst.push('http://www.nba.com' + el.getAttribute('href'));
    }
    cb(null, lst);
  });
}

if (!module.parent) {
  let day = process.argv[2] || today();
  let url = getNBAGameListUrl(day);

  getNBAGameList(url, (err, lst) => {
    if (err) return;

    lst.forEach((item) => {
      console.log(item);
    });
  });
}
