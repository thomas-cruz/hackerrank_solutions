let dates = ["20 Sep 1958", "25 May 1912", "08 Jun 1933", "12 Jun 1988", "16 Jun 1991", "20 Jun 1903", "24 Jun 1928"]
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let newDates = [];
let dateString = [];

    for (let i = 0; i < dates.length; i++) {
        newDates[i] = new Date(dates[i]);
    }

    newDates.sort(function(a, b){
        return a - b
    });

    console.log(newDates);

    for (let i = 0; i < dates.length; i++) {
        dateString[i] = newDates[i].toDateString().split(' ').slice(1).join(' ');
//       dateString[i] = '0' + newDates[i]'.getDate()).slice(-2) + ' ' month[newDates[i].getMonth()] + ' ' + newDates[i].getYear();
    }

    for (let t = 0; t < dateString[t].length; t++){
      process.stdout.write(dateString[t]);
//       fs.createWriteStream(process.env.OUTPUT_PATH).write("Your Output");
    }

    console.log(dateString);
    return dateString;
