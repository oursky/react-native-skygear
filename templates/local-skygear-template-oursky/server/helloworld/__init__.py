import skygear


def includeme(do_not_use_this):
    @skygear.op('hello')
    def hello_world():
        return {'result': 'world'}
