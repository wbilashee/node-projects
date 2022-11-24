const url = "/api/v1/products";
const formDOM = document.querySelector(".file-form");
const nameInputDOM = document.querySelector("#name");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#image");
const containerDOM = document.querySelector(".container");
let imageValue;

imageInputDOM.addEventListener("change", (e) => {
    const imageFile = e.target.files[0];
    const imageData = new FormData();
    imageData.append("image", imageFile, imageFile.name);

    fetch(`${url}/upload`, {
        method: "POST",
        body: imageData,
    })
        .then(res => res.json())
        .then(data => imageValue = data.secure_url)
        .catch(error => console.log(error));
});

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameValue = nameInputDOM.value;
    const priceValue = priceInputDOM.value;
    try {
        const product = { name: nameValue, price: priceValue, image: imageValue };
        await axios.post(url, product);
        fetchProducts();
    } catch (error) {
        console.log(error);
    }
});

const fetchProducts = async () => {
    try {
        const { data: { products } } = await axios.get(url);

        const productsDOM = products.map((product) => {
            return `<article class="product">
              <img src="${product.image}" alt="${product.name}" class="img"/>
              <footer>
              <p>${product.name}</p>
              <span>$${product.price}</span>
              </footer>
              </article>`
        }).join("");
        containerDOM.innerHTML = productsDOM;
    } catch (error) {
        console.log(error);
    }
}

fetchProducts();