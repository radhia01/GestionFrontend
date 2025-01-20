import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers'
import { getAllCategories } from '../../redux/actions/category'
import { getAllBrands } from '../../redux/actions/brand'
import { useTranslation } from 'react-i18next';
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function ProductForm({product,handleChange,handleDateChange,handleManufacturedDate,value,manufacturedDate}) {
    const dispatch=useDispatch()
    useEffect(() => {
       dispatch(getAllBrands())
       dispatch(getAllCategories())
    }, [dispatch])
    const {t}=useTranslation()
    const {categories}=useSelector(state=>state.category)
    const {brands}=useSelector(state=>state.brand)
      console.log(brands)
  return (
    <>
        <div className="flex">
            <TextField
              id="outlined-basic"
              label={t("product_name")}
              variant="outlined"
              name="name"
              fullWidth
              required
              value={product.name}
              sx={{ margin: 2 ,height:"50%"}}
            size="small"
              onChange={handleChange}
            />
            
             <TextField
              id="outlined-basic"
              fullWidth
              label={t("Product Price")}
              variant="outlined"
              name="price"
              required
              value={product.price}
              sx={{ margin: 2 }}
                size="small"
              onChange={handleChange}
            />
             <TextField
              id="outlined"
              label={t("Product Quantity")}
              variant="outlined"
              name="quantity"
              fullWidth
              required
              value={product.quantity}
              type="number"
              sx={{ margin: 2 }}
              size="small"
              onChange={handleChange}
            />
             <TextField
              id="outlined-basic"
              fullWidth
              label={t("quantity_alert")}
              variant="outlined"
              name="expiry_quantity"
              required
              value={product.expiry_quantity}
              sx={{ margin: 2 }}
                size="small"
              onChange={handleChange}
            />
              
            </div>
            
            <div className="flex">
            <FormControl sx={{width:"100%", margin: 2 }}>
              <InputLabel id="category-select-label">{t("category")}</InputLabel>
              <Select
                id="category-select"
                label={t("category")}
                name="id_category"
                value={product.id_category}
                onChange={handleChange}
              >
                {categories && categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{width:"100%", margin: 2 }}>
              <InputLabel id="category-select-label">{t("brand")}</InputLabel>
              <Select
                id="category-select"
                label={t("brand")}
                name="id_brand"
                value={product.id_brand}
                onChange={handleChange}
              >
                {brands && brands.map(brand => (
                  <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
                
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer   sx={{width:"100%",m:1}}components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label={t("expire_on")}
          value={value}
          onChange={(newValue) => handleDateChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer   sx={{width:"100%",m:1}}components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label={t("naufactured_on")}
          value={manufacturedDate}
          onChange={(newValue) => handleManufacturedDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider> */}
    
            </div>
          
      <div>
      <TextField
              id="outlined-basic"
              label={t("Product Description")}
              variant="outlined"
              value={product.description}
              name="description"
              sx={{ margin: 2,width:"50%" }}
              multiline
              required
              rows={4}
              
              onChange={handleChange}
            />
      </div>
</>
        
         
          
     

         
    
  )
}

export default ProductForm