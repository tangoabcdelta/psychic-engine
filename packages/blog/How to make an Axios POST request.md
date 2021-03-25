# How to make an Axios POST request

## JSON

## form data

If you want to send the data as form data instead of as JSON in the payload, you can create a FormData object and use that as second argument instead.

```js
submitHandler = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("username", "");
  formData.append("password", "");
  formData.append("user_type", 1);

  axios.post("http://demo.com/api/v1/end-user/login", formData).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};
```

You can do this in axios by using FormData() like

```js
var body = new FormData();
body.append('userName', 'test');
body.append('password', 'test');
body.append('user_type', 1);
And then you can use axios post method (You can amend it accordingly)

axios({
    method: 'post',
    url: 'http://demo.com/api/v1/end-user/login',
    data: body,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
```

## How to post a file from a form with Axios

Using raw HTML when I post a file to a flask server using the following I can access files from the flask request global:

```html
<form id="uploadForm" action='upload_file' role="form" method="post" enctype=multipart/form-data>
    <input type="file" id="file" name="file">
    <input type=submit value=Upload>
</form>
```

In flask:

def post(self):
if 'file' in request.files:
....
When I try to do the same with Axios the flask request global is empty:

```html
<form id="uploadForm" enctype="multipart/form-data" v-on:change="uploadFile">
  <input type="file" id="file" name="file" />
</form>
```

```js
uploadFile: function (event) {
    const file = event.target.files[0]
    axios.post('upload_file', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}
```

If I use the same `uploadFile` function above but remove the `headers` json from the `axios.post` method I get in the form key of my flask request object a csv list of string values (file is a `.csv`).

How can I get a file object sent via axios?

### Ans:

Add the file to a formData object, and set the Content-Type header to multipart/form-data.

```js
var formData = new FormData();
var imagefile = document.querySelector("#file");
formData.append("image", imagefile.files[0]);
axios.post("upload_file", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
```

#### Sample application using Vue. Requires a backend server running on localhost to process the request:

```js
var app = new Vue({
  el: "#app",
  data: {
    file: "",
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(">> formData >> ", formData);

      // You should have a server side REST API
      axios
        .post("http://localhost:8080/restapi/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(">>>> 1st element in files array >>>> ", this.file);
    },
  },
});
```

https://codepen.io/pmarimuthu/pen/MqqaOE
