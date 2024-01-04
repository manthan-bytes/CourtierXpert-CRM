// create dashboard page component
import React, { useEffect, useRef, useState } from "react";
import "./user.scss";
import {
  SendIcon,
  ExportdataIcon,
  EditIcon,
  DeleteIcon,
  RightIcon,
} from "../../core/icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumberChangeEvent } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { Toolbar } from "primereact/toolbar";
import Select from "react-select";
import { Dropdown } from "primereact/dropdown";
import { getAllLeads } from "../service/lead.service";
import { LEAD_TYPE, PROPERTY_TYPE } from "../../core/constants/constants";
import { CITIES } from "../../core/constants/cities";
import { NEWCITIES } from "../../core/constants/listOfCities";
import * as FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";
import { deleteUser, getAllUsers } from "../service/login.service";
import { ToastContainer, toast } from "react-toastify";

interface Product {
  id: string | null;
  code: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  borough: string;
  property: string;
  description: string;
  agent: string;
  quantity: number;
  inventoryStatus: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  password: null | string;
  role: string;
  resetPasswordToken: null | string;
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  let emptyProduct: Product = {
    id: null,
    code: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    city: "",
    borough: "",
    property: "",
    description: "",
    agent: "",

    quantity: 0,
    inventoryStatus: "INSTOCK",
  };
  const city: any = CITIES;
  const [getBoroughs, setBoroughs] = useState<any>();
  const [getUsers, setUsers] = useState<any>([]);
  // const [products, setProducts] = useState<any>([
  //   {
  //     id: "1000",
  //     code: "f230fh0g3",
  //     name: "Bamboo Watch",
  //     email: "binhan628@gmail.com",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "K Watson",
  //     quantity: 24,
  //     inventoryStatus: "INSTOCK",
  //   },
  //   {
  //     id: "1001",
  //     code: "nvklal433",
  //     name: "Black Watch",
  //     email: "trungkienspktnd@gamail.com",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "K",
  //     quantity: 61,
  //     inventoryStatus: "INSTOCK",
  //   },
  //   {
  //     id: "1002",
  //     code: "zz21cz3c1",
  //     name: "Blue Band",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "Watson",
  //     quantity: 2,
  //     inventoryStatus: "LOWSTOCK",
  //   },
  //   {
  //     id: "1001",
  //     code: "nvklal433",
  //     name: "Black Watch",
  //     email: "trungkienspktnd@gamail.com",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "K",
  //     quantity: 61,
  //     inventoryStatus: "INSTOCK",
  //   },
  //   {
  //     id: "1002",
  //     code: "zz21cz3c1",
  //     name: "Blue Band",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "Watson",
  //     quantity: 2,
  //     inventoryStatus: "LOWSTOCK",
  //   },
  //   {
  //     id: "1001",
  //     code: "nvklal433",
  //     name: "Black Watch",
  //     email: "trungkienspktnd@gamail.com",
  //     phone: "(505) 555-0125",
  //     role: "Seller",
  //     city: "Quebec, Saguenay",
  //     borough: "Côte-des-Neiges–Notre-Dame-de-Grâce",
  //     property: "Single Family",
  //     description: "Product Description",
  //     agent: "K",
  //     quantity: 61,
  //     inventoryStatus: "INSTOCK",
  //   },
  // ]);
  const [leadDialog, setLeadDialog] = useState<boolean>(false);
  // const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [getUser, setUser] = useState<User>();

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<DataTable<Product[]>>(null);
  const [locationOptions, setLocationOption] = useState<any>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [statuses] = useState([
    "Undecided",
    "Transferred",
    "Canceled",
    "Completed",
    "Inactive",
    "Contract Signed",
  ]);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const handleOnChangeLocation = async (selectedValue: any) => {
    // const data = [...locationOptions];
    const city = selectedValue.value;
    const selectedCityDate: any = NEWCITIES.find(
      (o: any) => o.city.value === selectedValue.value
    );
    setBoroughs(selectedCityDate.boroughs);
  };

  const handleMenuOpen = () => {
    setIsSelectOpen(true);
  };

  const handleMenuClose = () => {
    setIsSelectOpen(false);
  };

  const handleOnLeadTypeChange = (selectedValue: any) => {
    const leadData: any = { ...getUser };
    leadData.leadType = selectedValue.value;
    setUser(leadData);
  };

  const handleDownload = () => {
    const excelData: any = [];

    getUsers.forEach((element: User, i: number) => {
    

      const obj = {
        No: i + 1,
        Name: element.name,
        Email: element.email,
        Phone: element.phone,
        Role: element.role
       
      };
      excelData.push(obj);
    });
   
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "test" + fileExtension);

  };

  useEffect(() => {
    const leadObj = {
      page: 1,
      limit: 50,
    };
    const leads = getAllUsers(leadObj)
      .then((res) => {
        if (res.statusCode === 200) {
         
          setUsers(res.data.result);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.tsx:179 ~ leads ~ err:", err);
      });
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setLeadDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLeadDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    // setSubmitted(true);
    // if (product.name.trim()) {
    //   let _products = [...products];
    //   let _product = { ...product };
    //   if (product.id) {
    //     const index = findIndexById(product.id);
    //     _products[index] = _product;
    //     toast.current?.show({
    //       severity: "success",
    //       summary: "Successful",
    //       detail: "Product Updated",
    //       life: 3000,
    //     });
    //   } else {
    //     _product.id = createId();
    //     _products.push(_product);
    //     toast.current?.show({
    //       severity: "success",
    //       summary: "Successful",
    //       detail: "Product Created",
    //       life: 3000,
    //     });
    //   }
    //   setProducts(_products);
    //   setProductDialog(false);
    //   setProduct(emptyProduct);
    // }
  };

  const editProduct = (user: User) => {
    setUser({ ...user });
    setLeadDialog(true);
  };

  const confirmDeleteProduct = (lead: User) => {
    setUser(lead);
    // setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    // let _products = products.filter(
    //   (val: { id: string | null }) => val.id !== product.id
    // );

    // setProducts(_products);
    deleteUser(getUser?.id).then((res) => {
    console.log("🚀 ~ file: index.tsx:328 ~ deleteUser ~ res:", res)
    setDeleteProductDialog(false);
    toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    }).catch((err) => {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
   
    // setProduct(emptyProduct);
    // toast.current?.show({
    //   severity: "success",
    //   summary: "Successful",
    //   detail: "Product Deleted",
    //   life: 3000,
    // });
  };

  const createId = (): string => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const deleteSelectedProducts = () => {
    // let _products = products.filter(
    //   (val: Product) => !selectedProducts.includes(val)
    // );

    // setProducts(_products);
    // setDeleteProductsDialog(false);
    // setSelectedProducts([]);
    // toast.current?.show({
    //   severity: "success",
    //   summary: "Successful",
    //   detail: "Products Deleted",
    //   life: 3000,
    // });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    // const val = (e.target && e.target.value) || "";
    // let _product = { ...product };
    // // @ts-ignore
    // _product[`${name}`] = val;
    // setProduct(_product);
  };

  const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
    // const val = e.value || 0;
    // let _product = { ...product };
    // // @ts-ignore
    // _product[`${name}`] = val;
    // setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="+ New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData: Product) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="btn-tb"
          onClick={() => editProduct(rowData)}
        >
          <EditIcon />
        </Button> */}
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="btn-tb"
          onClick={() => confirmDeleteProduct(rowData)}
        >
          <DeleteIcon />
        </Button>
      </React.Fragment>
    );
  };

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "Undecided":
        return "success";

      case "Transferred":
        return "warning";

      case "Completed":
        return "danger";

      case "Inactive":
        return "danger";

      case "Contract Signed":
        return "danger";

      default:
        return null;
    }
  };
  const leadtDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="theme_btn"
        outlined
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="theme_btn balck_btn"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="theme_btn"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        className="theme_btn balck_btn"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const statusFilterTemplate = (options: any) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter filter-status"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: any) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  return (
    <>
      <div className="common-main-header">
        <div className="left-heading-block">
          <h2 className="h2">My Leads</h2>
        </div>
        <div className="right-btn-block">
          {/* <button className="theme_btn">
            <SendIcon /> Send to Agents
          </button> */}
          <button className="theme_btn balck_btn" onClick={handleDownload}>
            <ExportdataIcon />
            Export Data
          </button>
        </div>
      </div>
      <section>
        <DataTable
          className="datatable-main"
          ref={dt}
          value={getUsers}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
            }
          }}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          // globalFilter={globalFilter}
        >
    
          <Column
            field="name"
            header="Name"
            sortable
            style={{ width: "13%" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            className="emaildiv"
            style={{ width: "13%" }}
          ></Column>
          <Column
            field="phone"
            header="Phone No"
            style={{ width: "12%" }}
          ></Column>
          <Column
            field="role"
            header="Role"
            style={{ width: "4%" }}
          ></Column>
         
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "3%" }}
          ></Column>
        </DataTable>
        {/* <Toolbar className="new-table-add" left={leftToolbarTemplate}></Toolbar> */}
      </section>

      <Dialog
        visible={leadDialog}
        style={{ width: "42rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Lead Details"
        modal
        className="edit-popup-user"
        footer={leadtDialogFooter}
        onHide={hideDialog}
      >
        <div className="field-main">
          <div className="field">
            <label className="label-form" htmlFor="Role">
              Lead Type
            </label>

            {/* <Select
              className="select-main-wrap"
              options={LEAD_TYPE}
              value={LEAD_TYPE.find(
                (option) => option.value === getLead?.leadType
              )}
              onChange={(e) => handleOnLeadTypeChange(e)}
            /> */}
            {/* {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )} */}
          </div>
          <div className="field">
            <label className="label-form" htmlFor="City">
              City
            </label>

            {/* <Select
              className="select-main-wrap"
              options={city}
              onChange={(e) => handleOnChangeLocation(e)}
              onMenuOpen={handleMenuOpen}
              onMenuClose={handleMenuClose}
            /> */}
            {/* {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )} */}
          </div>
          <div className="field">
            {/* <label className="label-form" htmlFor="name">
              Borough
            </label>
            <Select className="select-main-wrap" options={getBoroughs} /> */}
            {/* {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}  */}
          </div>
          <div className="field">
            <label className="label-form" htmlFor="name">
              Property Type
            </label>
            <Select className="select-main-wrap" options={PROPERTY_TYPE} />
            {/* {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}  */}
          </div>
          {/* <div className="field"></div>
          <div className="field">
            <label className="label-form" htmlFor="name">
              Name
            </label>
            <ul className="property-select">
              <li>
                <label className="custom-checkbox">
                  <input type="checkbox" name="pool" value="pool" />
                  <div className="checkbox-lable">
                    <RightIcon />
                  </div>
                  <span>Remember</span>
                </label>
              </li>
            </ul> */}

          {/* {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )} */}
          {/* </div> */}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected user?</span>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Users;
