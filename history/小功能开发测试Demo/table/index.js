var app = new Vue({
  el: '#app',
	  data() {
    return {
      hasLeft: false,
      hasRight: false,
      scrollValue: 0,
      columns2: [
        {
          title: '姓名',
          key: 'name',
          width: 100,
          fixed: 'left',
        },
        {
          title: '年龄',
          key: 'age',
          width: 100,
        },
        {
          title: '省份',
          key: 'province',
          width: 100,
        },
        {
          title: '市区',
          key: 'city',
          width: 200,
        },
        {
          title: '地址',
          key: 'address',
          width: 200,
        },
        {
          title: '邮编',
          key: 'zip',
          width: 100,
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 100,
        },
      ],
      data4: [
        {
          province: 'Connecticut',
          city: 'South Anastacio',
          name: 'Oswaldo Considine',
          zip: '62352',
          age: 689,
          address: '49967 Lloyd Ridge',
        },
        {
          province: 'Ohio',
          city: 'Lake Sydnee',
          name: 'Kieran Thompson',
          zip: '03930',
          age: 234,
          address: '674 Stanton Locks',
        },
        {
          province: 'Montana',
          city: 'South Alexzanderfort',
          name: 'Lynn Willms',
          zip: '32615-1991',
          age: 595,
          address: '40564 Alysha Mill',
        },
        {
          province: 'Virginia',
          city: 'Lynnmouth',
          name: 'Gwendolyn Mohr Jr.',
          zip: '15517',
          age: 593,
          address: '573 Hegmann Gardens',
        },
        {
          province: 'Nevada',
          city: 'Smithamtown',
          name: 'Kobe Tillman',
          zip: '49700',
          age: 942,
          address: '85408 Gustave Key',
        },
        {
          province: 'Louisiana',
          city: 'Durganberg',
          name: 'Cletus Rempel',
          zip: '41996',
          age: 647,
          address: '009 Wintheiser Extensions',
        },
        {
          province: 'Pennsylvania',
          city: 'South Mattfurt',
          name: 'Stephany Erdman',
          zip: '72236',
          age: 266,
          address: '2123 Rolfson Cliff',
        },
        {
          province: 'Vermont',
          city: 'South Nicolas',
          name: 'Thad Stark',
          zip: '53975-4801',
          age: 920,
          address: '102 Katelyn Lodge',
        },
        {
          province: 'Oklahoma',
          city: 'West Syble',
          name: 'Shayne Block',
          zip: '77066',
          age: 199,
          address: '61061 Terry Orchard',
        },
        {
          province: 'Tennessee',
          city: 'Austenborough',
          name: 'Giovanna Yost',
          zip: '55889-8053',
          age: 605,
          address: '0964 Reynolds Junction',
        },
        {
          province: 'Hawaii',
          city: 'Timmyborough',
          name: 'Norene Will II',
          zip: '63035-1193',
          age: 74,
          address: '812 Zachariah Extensions',
        },
        {
          province: 'Wisconsin',
          city: 'North Theresa',
          name: 'Ila Ruecker',
          zip: '92413-8438',
          age: 935,
          address: '84530 Corkery Plains',
        },
        {
          province: 'Michigan',
          city: 'East Akeemstad',
          name: 'Gina Schaden I',
          zip: '36035',
          age: 393,
          address: '24068 Karley Path',
        },
        {
          province: 'Illinois',
          city: 'Velmahaven',
          name: 'Raoul Bailey',
          zip: '84101-0326',
          age: 871,
          address: '02314 Tracy Tunnel',
        },
      ],
    };
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    // 左右滚动
    handleBodyScroll() {
      this.scrollValue = this.$refs.tableScroll.scrollLeft;
      console.log('scrollValue', this.scrollValue);
      console.log('leftScroll', this.leftScroll);
      this.hasRight = this.scrollValue - (this.leftScroll + 100) < 0;
      this.hasLeft = this.scrollValue > 0;
    },
    // 上下滚动
    handleBodyScrollTop(event) {
      this.$refs.fixedBody.scrollTop = event.target.scrollTop;
      this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
    },
    setTableShadow() {
      this.leftScroll = this.$refs.tableContent.clientWidth - this.$refs.tableScroll.clientWidth;
      console.log(this.$refs.tableContent.clientWidth, this.$refs.tableScroll.clientWidth);
      this.handleBodyScroll();
    },
  },
  mounted() {
    window.onresize = this.setTableShadow;
    window.onload = this.setTableShadow;
  },
})