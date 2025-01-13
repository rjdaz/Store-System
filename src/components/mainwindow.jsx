import React, { useState, useEffect } from 'react';
import './mainwindow.css'
import Update from './update.jsx'

function MainWindow({ style }) {

    const [dataList, setDataList] = useState([]);
    const [inputSearch, setInputSearch] = useState(''); // for searching data
    const [inputNewProd, setInputNewProd] = useState(''), // data input
          [inputInvest, setInputInvest] = useState(''),
          [inputInvestNum, setInputInvestNum] = useState(''),
          [inputWholeSale, setInputWholeSale] = useState(''),
          [inputWholeSaleNum, setInputWholeSaleNum] = useState(''),
          [inputRetail, setInputRetail] = useState(''),
          [inputRetailNum, setInputRetailNum] = useState('')

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://store-system-3kic.onrender.com/store')
            .then(response => response.json())
            .then(data => setDataList(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function clearData() {
        setInputNewProd("");
        setInputInvest("");
        setInputInvestNum("");
        setInputWholeSale("");
        setInputWholeSaleNum("");
        setInputRetail("");
        setInputRetailNum("");
    }

    return (
        <>
            <div className="container-MainWindow" style={style}>
                <div className="header-main">
                <button onClick={() => {
                    let addWindow = document.getElementById('windowForAddItem');
                    const windUpdate = document.querySelector('.viewData');

                    addWindow.style.zIndex = "2";
                    addWindow.style.opacity = "1";
                    windUpdate.style.zIndex = "-1";
                    windUpdate.style.opacity = "1";
                }}>ADD</button>
                <input 
                    type="search"
                    placeholder='Seach'
                    className='seachBar'
                    id='searchBarr'
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    />
                </div>
                <div className='body-main'>
                    {/* Main Product List */}
                    <div className='body-table' id='dataLists'>
                        {/* data list */}
                        {dataList
                        .filter((data) => data.name.toUpperCase().includes(inputSearch.trim().toUpperCase()))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((data, index) => (
                            <div key={index} className="prodNames" id={`prodInfo-${index}`} data-index={index}>
                                <button onClick={() => {
                                    const windUpdate = document.querySelector('.viewData');
                                    let addWindow = document.getElementById('windowForAddItem');

                                    addWindow.style.zIndex = "-1";
                                    addWindow.style.opacity = "0";
                                    windUpdate.style.zIndex = "2";

                                    setSelectedProduct(data);
                                }}>&#9780;</button>
                                <p>P-Name: {data.name.toUpperCase()}</p>
                                <p>Retail: &#8369; {data.retail.toFixed(2)}</p>    
                            </div>
                        ))}
                    </div>

                    {/* Add product */}
                    <div className='addItem' id='windowForAddItem'>
                        <div className='header-addItem'>Add Product</div>
                        <label htmlFor="">New Product</label>
                        <input 
                            type="text" 
                            name="newProduct" 
                            className='inputProduct'
                            placeholder='New Product'
                            value={inputNewProd}
                            onChange={(e) => setInputNewProd(e.target.value)}
                            />
                        <label htmlFor="">Investment</label>
                        <div className='investment-list'>
                            <input 
                                type="number" 
                                name="" 
                                className='investment' 
                                placeholder='Investment'
                                value={inputInvest}
                                onChange={(e) => setInputInvest(e.target.value)}
                                />
                            <input 
                                type="number"
                                className='investmentNum'
                                placeholder='I.Qty'
                                value={inputInvestNum}
                                onChange={(e) => setInputInvestNum(e.target.value)}
                                />
                        </div>
                        <label htmlFor="">Wholesale</label>
                        <div className='wholesale-list'>
                            <input 
                                type="number"
                                className='wholesale'
                                placeholder='WholeSale'
                                value={inputWholeSale}
                                onChange={(e) => setInputWholeSale(e.target.value)}
                             />
                            <input 
                                type="number" 
                                name="" 
                                className='wholesaleNum'
                                placeholder='WS.Qty' 
                                value={inputWholeSaleNum}
                                onChange={(e) => setInputWholeSaleNum(e.target.value)}
                            />
                        </div>
                        <label htmlFor="">Retail</label>
                        <div className='retailList'>
                            <input 
                                type="number" 
                                name="" 
                                className='retail'
                                placeholder='Retail'
                                value={inputRetail}
                                onChange={(e) => setInputRetail(e.target.value)}
                            />
                            <input 
                                type="number" 
                                className='retailNum'
                                value={inputRetailNum}
                                placeholder='R.Qty'
                                onChange={(e) => setInputRetailNum(e.target.value)}
                            />
                        </div>
                        {/* button */}
                        <div className='btnAddItem'>
                            <button onClick={() => {
                                let windowAddItem = document.getElementById('windowForAddItem');

                                clearData();
                                windowAddItem.style.zIndex = "-1";
                                windowAddItem.style.opacity = "0";
                            }}>CLOSE</button>
                            <button onClick={() => {
                                clearData();
                            }}> 
                                CLEAR
                            </button>
                            <button type='submit' onClick={(e) => { 
                                e.preventDefault();

                                const newProdItem = inputNewProd.trim();
                                const prodInvestment = inputInvest.trim();
                                const prodINumber = inputInvestNum.trim();
                                const prodWSale = inputWholeSale.trim();
                                const prodWSNumber = inputWholeSaleNum.trim();
                                const prodRetail = inputRetail.trim();
                                const prodRNumber = inputRetailNum.trim();
                        
                                if (!newProdItem || !prodInvestment || !prodINumber || !prodWSale || !prodWSNumber || !prodRetail || !prodRNumber) {
                                    alert("All fields are required!");
                                    return;
                                }
                        
                                fetch('https://store-system-3kic.onrender.com/store')
                                    .then(response => response.json())
                                    .then(data => {
                                        let findMatchProd = data.find(product => product.name === newProdItem);
                        
                                        if (findMatchProd) {
                                            alert('Already have that Product Name');
                                        } else {
                                            fetch('https://store-system-3kic.onrender.com/store', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    name: newProdItem,
                                                    investment: prodInvestment,
                                                    num_invest: prodINumber,
                                                    wholesale: prodWSale,
                                                    num_wsale: prodWSNumber,
                                                    retail: prodRetail,
                                                    num_retail: prodRNumber
                                                })
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                console.log('Success:', data);
                                                setDataList([...dataList, {
                                                    name: newProdItem,
                                                    investment: prodInvestment,
                                                    num_invest: prodINumber,
                                                    wholesale: prodWSale,
                                                    num_wsale: prodWSNumber,
                                                    retail: prodRetail,
                                                    num_retail: prodRNumber
                                                }]);
                                                clearData();
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error);
                                            });
                                        }
                                    })
                                    .catch(error => console.error('Error fetching data:', error));
                             }}>
                                ADD
                            </button>
                        </div>
                    </div>
                    {/* window for viewData */}
                    <div className='viewData'>
                        <Update 
                            selectedProduct={selectedProduct}
                            closeUpdateWindow={() => {
                                setSelectedProduct(null)
                                const windUpdate = document.querySelector('.viewData');

                                windUpdate.style.zIndex = "-1";
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainWindow;