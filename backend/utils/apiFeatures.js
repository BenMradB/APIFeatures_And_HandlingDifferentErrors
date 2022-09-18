class APIFeatures {
    constructor(query, reqQuery) {
        this.query = query;
        this.reqQuery = reqQuery;
    };

    filter() {
        const queryObj = {...this.reqQuery};
        const excludedFields = ['limit', 'sort', 'page', 'fields'];
        
        let queryStr = JSON.stringify(this.reqQuery);

        const regExp = /\bgt|gte|lt|lte\b/g;

        queryStr.replace(regExp, match => `$${match}`);

        excludedFields.forEach(ele => delete queryObj[ele]);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.reqQuery.sort) {
            const sortBy = this.reqQuery.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('rank');
        }

        return this;
    }

    limitingFields() {
        if (this.reqQuery.fields) {
            const fields = this.reqQuery.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.sort('-password');
        }
        return this;
    }

    paginate() {
        const page = +this.reqQuery.page || 1;
        const limit = +this.reqQuery.limit || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this
    }
}

module.exports = APIFeatures;