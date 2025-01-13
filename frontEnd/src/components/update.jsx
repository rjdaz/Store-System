import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './update.css';

function Update({ selectedProduct, closeUpdateWindow }) {
    const [productName, setProductName] = useState('');
    const [investment, setInvestment] = useState('');
    const [investmentQty, setInvestmentQty] = useState('');
    const [wholesale, setWholesale] = useState('');
    const [wholesaleQty, setWholesaleQty] = useState('');
    const [retail, setRetail] = useState('');
    const [retailQty, setRetailQty] = useState('');
    
    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.name || '');
            setInvestment(selectedProduct.investment || '');
            setInvestmentQty(selectedProduct.num_invest || '');
            setWholesale(selectedProduct.wholesale || '');
            setWholesaleQty(selectedProduct.num_wsale || '');
            setRetail(selectedProduct.retail || '');
            setRetailQty(selectedProduct.num_retail || '');
        }
    }, [selectedProduct]);


    const handleUpdate = async () => {
        const updatedProduct = {
            name: productName.toUpperCase(),
            investment: investment,
            num_invest: investmentQty,
            wholesale: wholesale,
            num_wsale: wholesaleQty,
            retail: retail,
            num_retail: retailQty,
        };

        try {
            const response = await axios.patch(`https://store-system-3kic.onrender.com/store/${selectedProduct.id}`, updatedProduct);
            console.log('Updated product:', response.data);
            alert('Product updated successfully!');
            closeUpdateWindow();
            location.reload();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteSelect = () => {
        const windowConfirm = document.getElementById('confirm');
        windowConfirm.style.zIndex = "3";
        windowConfirm.style.opacity = "1";
    };

    const deleteItem = () => {
        fetch(`https://store-system-3kic.onrender.com/store/${selectedProduct.id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            closeUpdateWindow();
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        const confirmClosed = document.getElementById('confirm');
        confirmClosed.style.zIndex = "-1";
        confirmClosed.style.opacity = "0";        
    };

    return (
        <div className='update-window'>
            <h2>Update Data</h2>
            <div className='update-body'>
                <label htmlFor="">New Product</label>
                <input 
                    type="text" 
                    name="newProduct" 
                    className='inputProductupdate'
                    placeholder='New Product'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <label htmlFor="">Investment</label>
                <div className='investment-listupdate'>
                    <input 
                        type="number" 
                        className='investmentupdate' 
                        placeholder='Investment'
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                    />
                    <input 
                        type="number"
                        className='investmentNumupdate'
                        placeholder='I.Qty'
                        value={investmentQty}
                        onChange={(e) => setInvestmentQty(e.target.value)}
                    />
                </div>
                <label htmlFor="">Wholesale</label>
                <div className='wholesale-listupdate'>
                    <input 
                        type="number"
                        className='wholesaleupdate'
                        placeholder='WholeSale'
                        value={wholesale}
                        onChange={(e) => setWholesale(e.target.value)}
                    />
                    <input 
                        type="number" 
                        className='wholesaleNumupdate'
                        placeholder='WS.Qty' 
                        value={wholesaleQty}
                        onChange={(e) => setWholesaleQty(e.target.value)}
                    />
                </div>
                <label htmlFor="">Retail</label>
                <div className='retailListupdate'>
                    <input 
                        type="number" 
                        className='retailupdate'
                        placeholder='Retail'
                        value={retail}
                        onChange={(e) => setRetail(e.target.value)}
                    />
                    <input 
                        type="number" 
                        className='retailNumupdate'
                        placeholder='R.Qty'
                        value={retailQty}
                        onChange={(e) => setRetailQty(e.target.value)}
                    />
                </div>
                <div className='updatebtn'>
                    <button onClick={closeUpdateWindow}>CLOSE</button>
                    <button onClick={deleteSelect}>DELETE</button>
                    <button onClick={handleUpdate}>UPDATE</button>
                </div>
                <div className='confirm' id='confirm'>
                    <p>Do you want to delete this product? <span>{productName}</span>?</p>
                    <div>
                        <button onClick={deleteItem}>Yes</button>
                        <button onClick={() => {
                            const confirmClosed = document.getElementById('confirm');
                            confirmClosed.style.zIndex = "-1";
                            confirmClosed.style.opacity = "0";
                        }}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;