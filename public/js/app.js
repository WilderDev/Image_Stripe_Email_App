const url = '/api/v1/private-images';
const uploadFormDOM = document.querySelector('.upload-form');

const recipientInputDOM = document.querySelector('#recipient');
const subjectInputDOM = document.querySelector('#subject');
const priceInputDOM = document.querySelector('#price');
const imageInputDOM = document.querySelector('#image');

const containerDOM = document.querySelector('.container');
let imageValue;

imageInputDOM.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

uploadFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();

  const recipientValue = recipientInputDOM.value;
  const subjectValue = subjectInputDOM.value;
  const priceValue = priceInputDOM.value;

  try {
    const body = {
      recipient: recipientValue,
      subject: subjectValue,
      price: priceValue,
      image: imageValue,
    };

    await axios.post(url, body);
  } catch (error) {
    console.log(error);
  }
});
