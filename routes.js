module.exports = function (pug, app, json, html, defaultFormJson, formJson, htmlForm) {
  const updateStudentIds = () => {
    json.students = json.students.map((item, index) => {
      const obj = item;
      obj.id = index + 1;
      return obj;
    });
  };

  const getId = () => (json.students.length + 1);

  const getStudent = id => +json.students.findIndex(student => student.id === +id);

  const updateList = (req) => {
    if (req.body.id !== '') {
      json.students[getStudent(req.body.id)].firstName = req.body.firstname;
      json.students[getStudent(req.body.id)].lastName = req.body.lastname;
    } else {
      json.students.push({
        id: getId(),
        firstName: req.body.firstname,
        lastName: req.body.lastname,
      });
    }
  };

  app.get('/', (req, res) => {
    html = pug.renderFile('./views/file.pug', { ...json });
    res.send(html);
  });

  app.get('/api/v1/', (req, res) => {
    html = pug.renderFile('./views/file.pug', { ...json });
    res.send(html);
  });

  app.get('/api/v1/list/', (req, res) => {
    html = pug.renderFile('./views/file.pug', { ...json });
    res.send(html);
  });

  app.get('/api/v1/list/:id', (req, res) => {
    formJson.students = [{
      id: req.params.id,
      firstName: json.students[getStudent(req.params.id)].firstName,
      lastName: json.students[getStudent(req.params.id)].lastName,
    }];
    html = pug.renderFile('./views/file.pug', { ...formJson });
    res.send(html);
  });

  app.get('/api/v1/add/', (req, res) => {
    htmlForm = pug.renderFile('./views/form.pug', { ...defaultFormJson });
    res.send(htmlForm);
  });

  app.post('/api/v1/add/', (req, res) => {
    updateList(req);
    html = pug.renderFile('./views/file.pug', { ...json });
    res.send(html);
  });

  app.get('/api/v1/edit/:id', (req, res) => {
    formJson.students = [{
      id: req.params.id,
      firstName: json.students[getStudent(req.params.id)].firstName,
      lastName: json.students[getStudent(req.params.id)].lastName,
    }];
    htmlForm = pug.renderFile('./views/form.pug', { ...formJson });
    res.send(htmlForm);
  });

  app.get('/api/v1/delete/:id', (req, res) => {
    json.students = json.students.filter(item => item.id !== +req.params.id);
    updateStudentIds();
    html = pug.renderFile('./views/file.pug', { ...json });
    res.send(html);
  });
};
